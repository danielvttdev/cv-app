import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvSchema } from '../schemas/cvSchema';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import emailjs from 'emailjs-com';

import Tabs from './Tabs';
import ProgressIndicator from './ProgressIndicator';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Certifications from './Certifications';
import Summary from './Summary';
import CVPreview from './CVPreview';

const tabs = [
  { name: 'Información Personal', component: PersonalInfo },
  { name: 'Resumen', component: Summary },
  { name: 'Educación', component: Education },
  { name: 'Experiencia', component: WorkExperience },
  { name: 'Habilidades', component: Skills },
  { name: 'Certificaciones', component: Certifications },
];

const CVForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cvSchema),
    mode: 'onChange',
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
      },
      summary: '',
      education: [
        {
          title: '',
          institution: '',
          startDate: '',
          endDate: '',
          currentlyStudying: false,
        },
      ],
      workExperience: [
        {
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          responsibilities: [''],
          achievements: [],
          technologies: '',
        },
      ],
      skills: [],
      certifications: [],
      languages: [],
    },
  });

  const formData = watch();

  const generatePDF = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        throw new Error('No se pudo encontrar la vista previa del CV');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'mm',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: formData.personalInfo.email,
            to_name: formData.personalInfo.fullName,
            message: 'Adjunto encontrarás tu CV generado.',
            pdf_url: pdfUrl,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        
        pdf.save('cv.pdf');
        alert('¡CV generado y enviado con éxito! Revisa tu correo electrónico.');
      } catch (emailError) {
        console.error('Error al enviar el email:', emailError);
        pdf.save('cv.pdf');
        alert('El CV se ha generado pero hubo un problema al enviarlo por correo. Por favor, guarda el PDF manualmente.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al generar el CV. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForCurrentTab();
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (activeTab === tabs.length - 1) {
        await generatePDF();
      } else {
        setActiveTab(prev => prev + 1);
        setError('');
      }
    } else {
      setError('Por favor, completa todos los campos requeridos antes de continuar.');
    }
  };

  const getFieldsForCurrentTab = () => {
    switch (activeTab) {
      case 0:
        return ['personalInfo'];
      case 1:
        return ['summary'];
      case 2:
        return ['education'];
      case 3:
        return ['workExperience'];
      case 4:
        return ['skills', 'languages'];
      case 5:
        return ['certifications'];
      default:
        return [];
    }
  };

  const handlePrevious = () => {
    setActiveTab(prev => prev - 1);
    setError('');
  };

  const renderTabContent = () => {
    const CurrentComponent = tabs[activeTab].component;
    return <CurrentComponent 
      register={register} 
      control={control} 
      errors={errors} 
      data={formData}
    />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex gap-8">
          {/* Formulario */}
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden min-w-[600px]">
            <div className="sticky top-0 bg-white z-10">
              <div className="pt-4 pb-2">
                <ProgressIndicator steps={tabs} currentStep={activeTab} onTabChange={setActiveTab} />
              </div>
            </div>
            <form onSubmit={e => e.preventDefault()} className="p-6">
              {renderTabContent()}
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={activeTab === 0}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium
                    ${
                      activeTab === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                  `}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isGenerating}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium text-white
                    ${activeTab === tabs.length - 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                    ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {activeTab === tabs.length - 1 
                    ? (isGenerating ? 'Generando...' : 'Generar CV')
                    : 'Siguiente'
                  }
                </button>
              </div>
            </form>
          </div>

          {/* Vista previa */}
          <div className="flex-1 sticky top-8 h-[calc(100vh-4rem)] overflow-auto bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa en Tiempo Real</h2>
              <div id="cv-preview" className="bg-white">
                <CVPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVForm; 