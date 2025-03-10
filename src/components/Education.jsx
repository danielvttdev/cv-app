import { useFieldArray } from 'react-hook-form';

const Education = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

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
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                {...register(`education.${index}.title`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Ingeniería en Sistemas"
              />
              {errors.education?.[index]?.title && (
                <p className="mt-1 text-sm text-red-600">{errors.education[index].title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institución</label>
              <input
                type="text"
                {...register(`education.${index}.institution`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nombre de la institución"
              />
              {errors.education?.[index]?.institution && (
                <p className="mt-1 text-sm text-red-600">{errors.education[index].institution.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Año de Inicio</label>
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...register(`education.${index}.startDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="YYYY"
              />
              {errors.education?.[index]?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.education[index].startDate.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Año de Finalización</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register(`education.${index}.currentlyStudying`)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">Cursando actualmente</span>
                </div>
              </div>
              <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...register(`education.${index}.endDate`)}
                disabled={field.currentlyStudying}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="YYYY"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({
          title: '',
          institution: '',
          startDate: '',
          endDate: '',
          currentlyStudying: false,
        })}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Agregar Educación
      </button>
    </div>
  );
};

export default Education; 