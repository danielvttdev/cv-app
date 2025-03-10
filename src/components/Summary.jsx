const Summary = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Resumen Profesional
      </label>
      <textarea
        {...register('summary')}
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Describe brevemente tu perfil profesional, experiencia y objetivos..."
      />
      {errors.summary && (
        <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
      )}
      <p className="text-sm text-gray-500">
        Un buen resumen profesional debe destacar tus principales logros, habilidades y objetivos profesionales.
        Intenta mantenerlo conciso pero informativo.
      </p>
    </div>
  );
};

export default Summary; 