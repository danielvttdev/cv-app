import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './custom-ats-style.css';

function ATSFormat({ data }) {
  // Formato ATS basado en la imagen de referencia
  return (
    <div id="ats-preview" className="cv-ats-preview bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Encabezado con nombre y logo */}
      <div className="cv-header border-b border-teal-500 px-6 py-3 flex justify-between items-center bg-gray-50">
        <div>
          <h1 className="cv-name text-gray-800 uppercase font-bold">
            {data.name || "NOMBRE COMPLETO"}
          </h1>
          <p className="cv-text-small text-gray-600 uppercase">Currículum Vitae</p>
        </div>
        <div className="text-2xl font-bold text-teal-600">CV</div>
      </div>
      
      {/* Contenido principal - estructura de dos columnas */}
      <div className="cv-container flex flex-col md:flex-row">
        {/* Columna izquierda - datos personales e información adicional */}
        <div className="cv-sidebar w-full md:w-1/3 bg-gray-50 p-4">
          <div className="mb-6">
            <h3 className="cv-section-title">
              Datos Personales
            </h3>
            <ul className="space-y-2 cv-content">
              {data.name && (
                <li className="flex">
                  <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                  <div>
                    <span className="cv-label">NOMBRE: </span>{data.name}
                  </div>
                </li>
              )}
              {data.email && (
                <li className="flex">
                  <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                  <div>
                    <span className="cv-label">EMAIL: </span>{data.email}
                  </div>
                </li>
              )}
              {data.phone && (
                <li className="flex">
                  <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                  <div>
                    <span className="cv-label">CELULAR: </span>{data.phone}
                  </div>
                </li>
              )}
              {data.location && (
                <li className="flex">
                  <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                  <div>
                    <span className="cv-label">DOMICILIO: </span>{data.location}
                  </div>
                </li>
              )}
              {data.linkedin && (
                <li className="flex">
                  <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                  <div>
                    <span className="cv-label">LINKEDIN: </span>{data.linkedin}
                  </div>
                </li>
              )}
            </ul>
          </div>
          
          {data.skills && (
            <div className="mb-6">
              <h3 className="cv-section-title">
                Habilidades
              </h3>
              <ul className="space-y-2 cv-content">
                {data.skills.split(',').map((skill, index) => (
                  <li key={index} className="flex">
                    <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                    <div>{skill.trim()}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {data.professionalSummary && (
            <div className="mb-6">
              <h3 className="cv-section-title">
                Perfil Profesional
              </h3>
              <p className="cv-content">{data.professionalSummary}</p>
            </div>
          )}
        </div>
        
        {/* Columna derecha - formación y experiencia */}
        <div className="cv-main w-full md:w-2/3 p-4">
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h3 className="cv-section-title">
                Formación Académica
              </h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex">
                    <div className="cv-bullet mr-2 flex-shrink-0">■</div>
                    <div className="w-full cv-content">
                      <p className="font-bold">{edu.degree}</p>
                      <p>{edu.institution}</p>
                      <p className="cv-text-small text-gray-600">
                        {edu.startDate} - {edu.current ? "Presente" : edu.endDate || "No especificado"}
                      </p>
                      {edu.description && (
                        <p className="cv-text-small text-gray-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Sección oculta para palabras clave (solo visible para ATS) */}
          <div className="cv-keywords" style={{ display: 'none' }}>
            <p>
              curriculum vitae, optimizado para ATS, formato ATS, selección de personal, 
              {data.education && data.education.map(edu => ` ${edu.degree},`)}
              {data.keywords && ` ${data.keywords},`}
              habilidades técnicas, sistemas de seguimiento de candidatos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para generar el PDF optimizado para ATS
export const generateATSPDF = async (data) => {
  let loadingDiv = null;
  
  try {
    const element = document.getElementById("ats-preview");
    if (!element) throw new Error("No se encontró el elemento de vista previa ATS");

    // Mostramos un indicador de carga en la UI con animación
    loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Generando CV optimizado para ATS...</p>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    // Asegurarnos de que la animación se muestre antes de procesar la imagen
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2, // Mayor resolución
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Asegurar que no se recorte ningún contenido
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    // Creamos un PDF simple sin diseños complejos
    const pdf = new jsPDF("p", "mm", "a4");
    
    // Ajustar posición y escala para que quede mejor centrado
    const imgWidth = 190;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    // Si la altura es mayor que el tamaño de la página, ajustamos la escala
    const pageHeight = 277; // A4 menos márgenes
    
    if (imgHeight > pageHeight) {
      // Si la imagen es muy alta, la ajustamos para que quepa en una página
      const newImgHeight = pageHeight;
      const newImgWidth = (canvas.width * newImgHeight) / canvas.height;
      pdf.addImage(imgData, "PNG", (210 - newImgWidth) / 2, 10, newImgWidth, newImgHeight);
    } else {
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    }
    
    // Agregamos metadatos al PDF para mejorar SEO y accesibilidad
    pdf.setProperties({
      title: `CV de ${data.name || 'Profesional'}`,
      subject: 'Curriculum Vitae optimizado para ATS',
      author: data.name || 'Usuario',
      keywords: `cv, curriculum vitae, ats, ${data.keywords || ''}`,
      creator: 'Generador de CV ATS Profesional'
    });
    
    // Eliminamos el indicador de carga
    if (loadingDiv && document.body.contains(loadingDiv)) {
      document.body.removeChild(loadingDiv);
      loadingDiv = null;
    }
    
    return pdf;
  } catch (error) {
    console.error("Error al generar el CV en formato ATS:", error);
    
    // Eliminamos el indicador de carga si hubo error
    if (loadingDiv && document.body.contains(loadingDiv)) {
      document.body.removeChild(loadingDiv);
    }
    
    // Mostrar mensaje de error al usuario
    const errorDiv = document.createElement('div');
    errorDiv.className = 'loading-overlay';
    errorDiv.innerHTML = `
      <div class="loading-container">
        <p style="color: #e53e3e; font-weight: bold; margin-bottom: 10px;">Error al generar el CV</p>
        <p>${error.message || 'Ocurrió un problema al crear el PDF'}</p>
        <button style="background-color: #3182ce; color: white; padding: 8px 16px; border-radius: 4px; margin-top: 10px;">Aceptar</button>
      </div>
    `;
    document.body.appendChild(errorDiv);
    
    // Eliminar el mensaje después de hacer clic en el botón
    errorDiv.querySelector('button').addEventListener('click', () => {
      document.body.removeChild(errorDiv);
    });
    
    throw error;
  }
};

export default ATSFormat; 