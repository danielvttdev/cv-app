import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schema";
import Tabs from "./Tabs";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import ATSFormat, { generateATSPDF } from "./ATSFormat";
import ATSTips from "./ATSTips";
import ProgressIndicator from "./ProgressIndicator";

function CVForm() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Información Personal", "Educación", "Vista Previa"];

  const methods = useForm({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      professionalSummary: "",
      skills: "",
      keywords: "",
      education: [{ 
        degree: "", 
        institution: "", 
        startDate: "", 
        endDate: "", 
        current: false,
        description: ""
      }],
    },
  });

  const { handleSubmit, watch } = methods;
  const formData = watch();

  // Descargar el CV ATS generado
  const downloadCV = async () => {
    try {
      const pdf = await generateATSPDF(formData);
      pdf.save("cv-ats.pdf");
    } catch (error) {
      alert("Error al generar el PDF: " + error.message);
    }
  };

  const handleNext = () => {
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  const handlePrev = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-6">
      <h1 className="text-3xl font-bold text-center p-6 bg-gray-50 border-b text-gray-800">
        Generador de CV Optimizado para ATS
      </h1>
      <ProgressIndicator 
        activeTab={activeTab} 
        totalTabs={tabs.length} 
        tabLabels={tabs}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(() => setActiveTab(2))}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
            <PersonalInfo title={tabs[0]} />
            <Education title={tabs[1]} />
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold mb-4 preview-heading">
                {tabs[2]}
              </h2>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-teal-700">
                  <strong>Vista previa:</strong> Así se verá tu CV optimizado para sistemas ATS. Si todo está correcto, descárgalo en PDF.
                </p>
              </div>
              <div className="preview-container">
                <ATSFormat data={formData} />
                <div className="preview-actions mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={downloadCV}
                    className="preview-button download-button text-white bg-teal-600 hover:bg-teal-700 px-6 py-3 text-lg font-bold"
                  >
                    Descargar CV ATS
                  </button>
                </div>
              </div>
              <ATSTips />
            </div>
          </Tabs>
          <div className="p-6 flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeTab === 0}
              className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-300 ${
                activeTab === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Anterior
            </button>
            {activeTab < tabs.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Siguiente
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CVForm;