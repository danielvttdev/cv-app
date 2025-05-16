import { useFieldArray, useFormContext } from "react-hook-form";

const Education = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Educación</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-700">
          <strong>Consejo:</strong> La información educativa es fundamental en un CV optimizado para ATS.
          Incluye títulos completos y utiliza términos estándar reconocibles por los sistemas automáticos.
        </p>
      </div>
      
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg relative bg-gray-50 transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
            aria-label="Eliminar entrada"
          >
            ×
          </button>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Título *</label>
              <input
                {...register(`education.${index}.degree`, { required: "El título es requerido" })}
                placeholder="Ej: Grado en Ingeniería Informática"
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Escribe el título completo. Evita abreviaturas.</p>
              {errors.education?.[index]?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.education[index].degree.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Institución *</label>
              <input
                {...register(`education.${index}.institution`, { required: "La institución es requerida" })}
                placeholder="Ej: Universidad Complutense de Madrid"
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm mt-1">{errors.education[index].institution.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Fecha de Inicio</label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate`)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Fecha de Finalización</label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate`)}
                  disabled={field.current}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200 disabled:bg-gray-200"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    {...register(`education.${index}.current`)}
                    className="mr-2"
                  />
                  <span className="text-sm">Actualmente estudiando aquí</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Descripción (opcional)</label>
              <textarea
                {...register(`education.${index}.description`)}
                placeholder="Describe brevemente los aspectos relevantes de tu formación, logros o materias importantes"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">Incluye palabras clave relevantes para mejorar la detección ATS</p>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ degree: "", institution: "", startDate: "", endDate: "", current: false, description: "" })}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Añadir Educación
      </button>
    </div>
  );
};

export default Education;