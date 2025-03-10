const PersonalInfo = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          id="fullName"
          {...register('personalInfo.fullName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Juan Pérez"
        />
        {errors.personalInfo?.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.personalInfo.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          {...register('personalInfo.email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="juan@ejemplo.com"
        />
        {errors.personalInfo?.email && (
          <p className="mt-1 text-sm text-red-600">{errors.personalInfo.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          {...register('personalInfo.phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="+34 123 456 789"
        />
        {errors.personalInfo?.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.personalInfo.phone.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo; 