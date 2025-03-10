import { useFieldArray } from 'react-hook-form';

const languageLevels = ['Básico', 'Intermedio', 'Avanzado', 'Nativo'];

const Skills = ({ control, register, errors }) => {
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: 'skills'
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage
  } = useFieldArray({
    control,
    name: 'languages'
  });

  return (
    <div className="space-y-8">
      {/* Habilidades */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Habilidades</h3>
        <div className="space-y-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  {...register(`skills.${index}.name`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nombre de la habilidad"
                />
                {errors.skills?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills[index].name.message}</p>
                )}
              </div>

              <div className="w-32">
                <select
                  {...register(`skills.${index}.level`, { valueAsNumber: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1">Básico</option>
                  <option value="2">Regular</option>
                  <option value="3">Intermedio</option>
                  <option value="4">Avanzado</option>
                  <option value="5">Experto</option>
                </select>
              </div>

              <div className="w-24">
                <select
                  {...register(`skills.${index}.category`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="technical">Técnica</option>
                  <option value="soft">Blanda</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => removeSkill(index)}
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
            onClick={() => appendSkill({ name: '', level: 3, category: 'technical' })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Agregar Habilidad
          </button>
        </div>
      </div>

      {/* Idiomas */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Idiomas</h3>
        <div className="space-y-4">
          {languageFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  {...register(`languages.${index}.name`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nombre del idioma"
                />
                {errors.languages?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.languages[index].name.message}</p>
                )}
              </div>

              <div className="w-40">
                <select
                  {...register(`languages.${index}.level`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {languageLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.languages?.[index]?.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.languages[index].level.message}</p>
                )}
              </div>

              <div className="flex-grow">
                <input
                  type="text"
                  {...register(`languages.${index}.certification`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Certificación (opcional)"
                />
              </div>

              <button
                type="button"
                onClick={() => removeLanguage(index)}
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
            onClick={() => appendLanguage({ name: '', level: 'Intermedio', certification: '' })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Agregar Idioma
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills; 