const CVPreview = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  const formatTechnologies = (technologies) => {
    if (!technologies) return '';
    if (typeof technologies === 'string') {
      return technologies;
    }
    if (Array.isArray(technologies)) {
      return technologies.join(', ');
    }
    return '';
  };

  return (
    <div id="cv-preview" className="bg-white p-8 shadow-lg rounded-lg">
      {/* Información Personal */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Nombre Completo'}
        </h1>
        <div className="text-gray-600 space-y-1">
          <p>{data.personalInfo.email || 'correo@ejemplo.com'}</p>
          <p>{data.personalInfo.phone || 'Teléfono no especificado'}</p>
        </div>
      </div>

      {/* Resumen */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resumen Profesional</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{data.summary}</p>
        </div>
      )}

      {/* Educación */}
      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Educación</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{edu.title}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500 text-sm">
                  {edu.startDate} - {edu.currentlyStudying ? 'Presente' : edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experiencia Laboral */}
      {data.workExperience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experiencia Laboral</h2>
          <div className="space-y-6">
            {data.workExperience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-500 text-sm">
                  {exp.startDate} - {exp.currentlyWorking ? 'Presente' : exp.endDate}
                </p>
                {exp.responsibilities?.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
                {exp.technologies && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Tecnologías: {formatTechnologies(exp.technologies)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habilidades */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Habilidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Técnicas</h3>
              <div className="space-y-2">
                {data.skills
                  .filter(skill => skill.category === 'technical')
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.level ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Blandas</h3>
              <div className="space-y-2">
                {data.skills
                  .filter(skill => skill.category === 'soft')
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.level ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proyectos */}
      {data.projects?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Proyectos</h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                {project.role && <p className="text-gray-600 italic">{project.role}</p>}
                <p className="text-gray-700 mt-1">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Tecnologías: {project.technologies.join(', ')}
                  </p>
                )}
                <div className="mt-2 space-x-4 text-sm">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver proyecto
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver código
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificaciones */}
      {data.certifications?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Certificaciones</h2>
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">
                  {cert.issueDate}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Verificar certificación
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {data.languages?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Idiomas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">{lang.name}</h3>
                <p className="text-gray-600">{lang.level}</p>
                {lang.certification && (
                  <p className="text-sm text-gray-500">{lang.certification}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información Adicional */}
      {(data.additionalInfo?.achievements?.length > 0 ||
        data.additionalInfo?.volunteer?.length > 0 ||
        data.additionalInfo?.interests?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Información Adicional</h2>
          
          {/* Logros */}
          {data.additionalInfo.achievements?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Logros y Reconocimientos</h3>
              <ul className="list-disc list-inside text-gray-700">
                {data.additionalInfo.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Voluntariado */}
          {data.additionalInfo.volunteer?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Experiencia de Voluntariado</h3>
              <div className="space-y-4">
                {data.additionalInfo.volunteer.map((vol, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{vol.organization}</h4>
                    <p className="text-gray-600">{vol.role}</p>
                    <p className="text-gray-500 text-sm">
                      {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : 'Presente'}
                    </p>
                    {vol.description && (
                      <p className="text-gray-700 mt-1">{vol.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Intereses */}
          {data.additionalInfo.interests?.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Intereses</h3>
              <p className="text-gray-700">{data.additionalInfo.interests.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CVPreview; 