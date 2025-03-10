import { useFieldArray } from 'react-hook-form';

const Certifications = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
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
              <label className="block text-sm font-medium text-gray-700">
                Nombre de la Certificación
              </label>
              <input
                type="text"
                {...register(`certifications.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: AWS Certified Developer"
              />
              {errors.certifications?.[index]?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.certifications[index].name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institución Emisora
              </label>
              <input
                type="text"
                {...register(`certifications.${index}.issuer`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Amazon Web Services"
              />
              {errors.certifications?.[index]?.issuer && (
                <p className="mt-1 text-sm text-red-600">{errors.certifications[index].issuer.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Emisión
              </label>
              <input
                type="date"
                {...register(`certifications.${index}.issueDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.certifications?.[index]?.issueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.certifications[index].issueDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Expiración
              </label>
              <input
                type="date"
                {...register(`certifications.${index}.expiryDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID de la Credencial
              </label>
              <input
                type="text"
                {...register(`certifications.${index}.credentialId`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: ABC123XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de Verificación
              </label>
              <input
                type="url"
                {...register(`certifications.${index}.credentialUrl`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://..."
              />
              {errors.certifications?.[index]?.credentialUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.certifications[index].credentialUrl.message}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
          credentialUrl: '',
        })}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Agregar Certificación
      </button>
    </div>
  );
};

export default Certifications; 