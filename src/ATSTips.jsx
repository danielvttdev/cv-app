import React, { useState } from 'react';

function ATSTips() {
  const [expandedSection, setExpandedSection] = useState('about');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h3 className="text-base font-semibold text-blue-700 mb-3">Guía para CVs optimizados para ATS</h3>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('about')}
          className="w-full flex justify-between items-center bg-white px-3 py-2 rounded-md border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm font-medium text-blue-700">¿Qué es un CV optimizado para ATS?</span>
          <span className="text-blue-500">{expandedSection === 'about' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'about' && (
          <div className="mt-2 p-3 bg-white rounded-md border border-blue-100 text-sm text-gray-700">
            <p className="mb-2">
              Un CV optimizado para ATS (Applicant Tracking System) está diseñado específicamente 
              para ser procesado correctamente por los sistemas automatizados que utilizan las empresas 
              para filtrar candidatos.
            </p>
            <p>
              En el mercado laboral actual, más del 75% de los currículums son inicialmente 
              procesados por estos sistemas antes de llegar a un reclutador humano. Si tu CV 
              no está optimizado, podría ser descartado automáticamente.
            </p>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <button 
          onClick={() => toggleSection('benefits')}
          className="w-full flex justify-between items-center bg-white px-3 py-2 rounded-md border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm font-medium text-blue-700">Ventajas del formato ATS</span>
          <span className="text-blue-500">{expandedSection === 'benefits' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'benefits' && (
          <div className="mt-2 p-3 bg-white rounded-md border border-blue-100">
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Mayor probabilidad de superar los filtros automáticos</li>
              <li>Estructura clara y legible por sistemas automatizados</li>
              <li>Mejor indexación de tus habilidades y experiencia</li>
              <li>Compatible con la mayoría de los sistemas de reclutamiento</li>
              <li>Destacas frente a candidatos con CV no optimizados</li>
            </ul>
          </div>
        )}
      </div>
      
      <div>
        <button 
          onClick={() => toggleSection('tips')}
          className="w-full flex justify-between items-center bg-white px-3 py-2 rounded-md border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <span className="text-sm font-medium text-blue-700">Consejos para optimizar tu CV</span>
          <span className="text-blue-500">{expandedSection === 'tips' ? '−' : '+'}</span>
        </button>
        
        {expandedSection === 'tips' && (
          <div className="mt-2 p-3 bg-white rounded-md border border-blue-100">
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Usa palabras clave específicas de la oferta de trabajo y tu industria</li>
              <li>Mantén un formato simple sin tablas, columnas o elementos complejos</li>
              <li>Utiliza títulos de sección estándar (Educación, Experiencia, etc.)</li>
              <li>Evita encabezados o pies de página, los sistemas ATS pueden ignorarlos</li>
              <li>Usa formatos de archivo estándar como PDF o .docx</li>
              <li>Evita imágenes, iconos, gráficos o elementos visuales complejos</li>
              <li>Incluye información de contacto en el cuerpo del documento, no en encabezados</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSTips; 