import { useFieldArray, useFormContext } from "react-hook-form";

const Education = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Educación</h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg relative bg-gray-50 transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
          >
            ×
          </button>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Título *</label>
              <input
                {...register(`education.${index}.degree`, { required: "El título es requerido" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              {errors.education?.[index]?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.education[index].degree.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Institución *</label>
              <input
                {...register(`education.${index}.institution`, { required: "La institución es requerida" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm mt-1">{errors.education[index].institution.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Fecha de Inicio</label>
              <input
                type="date"
                {...register(`education.${index}.startDate`)}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">Fecha de Finalización</label>
              <input
                type="date"
                {...register(`education.${index}.endDate`)}
                disabled={field.current}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200 disabled:bg-gray-200"
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  {...register(`education.${index}.current`)}
                  className="mr-2"
                />
                Actualmente estudiando aquí
              </label>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ degree: "", institution: "", startDate: "", endDate: "", current: false })}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        + Añadir Educación
      </button>
    </div>
  );
};

export default Education;