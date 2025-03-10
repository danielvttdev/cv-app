import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schema";
import Tabs from "./Tabs";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import CVPreview from "./CVPreview";
import ProgressIndicator from "./ProgressIndicator";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const EMAILJS_SERVICE_ID = "service_hreyjse";
const EMAILJS_TEMPLATE_ID = "template_ysegiyd";
const EMAILJS_PUBLIC_KEY = "Xs5TxREYTn1rUGzDJ";

function CVForm() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Información Personal", "Educación", "Vista Previa"];

  const methods = useForm({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      education: [{ degree: "", institution: "", startDate: "", endDate: "", current: false }],
    },
  });

  const { handleSubmit, watch } = methods;
  const formData = watch();

  const onSubmit = async (data) => {
    try {
      const element = document.getElementById("cv-preview");
      if (!element) throw new Error("No se encontró el elemento de vista previa");

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      const pdfBlob = pdf.output("blob");

      const emailParams = {
        to_email: data.email,
        name: data.name,
        message: "Tu CV ha sido generado. Descárgalo desde tu dispositivo.",
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      );

      pdf.save("cv.pdf");
      console.log("CV generado y enviado con éxito");
    } catch (error) {
      console.error("Error al generar o enviar el CV:", error);
      alert(`Error: ${error.message}`);
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
        Creador de Curriculum Vitae
      </h1>
      <ProgressIndicator activeTab={activeTab} totalTabs={tabs.length} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
            <PersonalInfo title={tabs[0]} />
            <Education title={tabs[1]} />
            <CVPreview title={tabs[2]} data={formData} />
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
            <button
              type="button"
              onClick={handleNext}
              disabled={activeTab === tabs.length - 1}
              className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-300 ${
                activeTab === tabs.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Siguiente
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
              Generar CV
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CVForm;