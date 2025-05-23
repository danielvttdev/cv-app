function CVPreview({ data }) {
  return (
    <div id="cv-preview" className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="cv-header text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">{data.name || "Nombre Completo"}</h1>
        <p className="text-sm text-gray-600">
          {data.email && `Email: ${data.email}`} {data.phone && `| Teléfono: ${data.phone}`}
        </p>
      </div>
      {data.education && data.education.length > 0 && (
        <div className="cv-section">
          <h3 className="text-base font-semibold text-blue-600 border-b border-gray-200 pb-1 mb-3">Educación</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="text-sm font-semibold text-gray-800">{edu.degree} - {edu.institution}</p>
              <p className="text-xs text-gray-600">
                {edu.startDate} - {edu.current ? "Presente" : edu.endDate || "No especificado"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CVPreview;