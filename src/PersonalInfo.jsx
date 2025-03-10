import { useFormContext } from "react-hook-form";

function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Información Personal</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Nombre Completo *</label>
          <input
            {...register("name", { required: "El nombre es requerido" })}
            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Correo Electrónico *</label>
          <input
            {...register("email", { required: "El correo es requerido" })}
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Teléfono *</label>
          <input
            {...register("phone", { required: "El teléfono es requerido" })}
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;