import { useFieldArray } from 'react-hook-form';

const WorkExperience = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const addResponsibility = (experienceIndex) => {
    const { fields: responsibilities, append: appendResponsibility } = useFieldArray({
      control,
      name: `workExperience.${experienceIndex}.responsibilities`,
    });
    appendResponsibility('');
  };

  const removeResponsibility = (experienceIndex, responsibilityIndex) => {
    const { fields: responsibilities, remove: removeResp } = useFieldArray({
      control,
      name: `workExperience.${experienceIndex}.responsibilities`,
    });
    removeResp(responsibilityIndex);
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-6 bg-gray-50 rounded-lg relative">
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Puesto</label>
              <input
                type="text"
                {...register(`workExperience.${index}.position`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Desarrollador Senior"
              />
              {errors.workExperience?.[index]?.position && (
                <p className="mt-1 text-sm text-red-600">{errors.workExperience[index].position.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Empresa</label>
              <input
                type="text"
                {...register(`workExperience.${index}.company`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nombre de la empresa"
              />
              {errors.workExperience?.[index]?.company && (
                <p className="mt-1 text-sm text-red-600">{errors.workExperience[index].company.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Año de Inicio</label>
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...register(`workExperience.${index}.startDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="YYYY"
              />
              {errors.workExperience?.[index]?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.workExperience[index].startDate.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Año de Finalización</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register(`workExperience.${index}.currentlyWorking`)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">Trabajo actual</span>
                </div>
              </div>
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...register(`workExperience.${index}.endDate`)}
                disabled={field.currentlyWorking}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="YYYY"
              />
            </div>
          </div>

          {/* Responsabilidades */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Responsabilidades</label>
            <div className="mt-2 space-y-2">
              {field.responsibilities?.map((_, respIndex) => (
                <div key={respIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    {...register(`workExperience.${index}.responsibilities.${respIndex}`)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe una responsabilidad clave"
                  />
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index, respIndex)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addResponsibility(index)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                + Agregar responsabilidad
              </button>
            </div>
          </div>

          {/* Tecnologías */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Tecnologías utilizadas</label>
            <input
              type="text"
              {...register(`workExperience.${index}.technologies`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ej: React, Node.js, Python (separadas por comas)"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          responsibilities: [],
          technologies: '',
          achievements: []
        })}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Agregar Experiencia Laboral
      </button>
    </div>
  );
};

export default WorkExperience; 