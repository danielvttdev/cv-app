import { useFormContext } from "react-hook-form";

function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Información Personal</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-700">
          <strong>Consejo:</strong> Para un CV optimizado para ATS, es importante incluir información de contacto completa 
          y utilizar palabras clave relevantes para tu industria.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Nombre Completo *</label>
          <input
            {...register("name", { required: "El nombre es requerido" })}
            placeholder="Ej: Juan Pérez González"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico *</label>
            <input
              {...register("email", { required: "El correo es requerido" })}
              type="email"
              placeholder="Ej: juan.perez@email.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Teléfono *</label>
            <input
              {...register("phone", { required: "El teléfono es requerido" })}
              type="tel"
              placeholder="Ej: +34 612 345 678"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ubicación</label>
            <input
              {...register("location")}
              placeholder="Ej: Madrid, España"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">Ciudad, país (ayuda en búsquedas localizadas)</p>
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Perfil de LinkedIn</label>
            <input
              {...register("linkedin")}
              placeholder="Ej: linkedin.com/in/juanperez"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Resumen Profesional</label>
          <textarea
            {...register("professionalSummary")}
            placeholder="Breve descripción de tu perfil profesional y objetivos (2-3 frases)"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Incluye palabras clave relevantes para tu industria</p>
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Habilidades</label>
          <textarea
            {...register("skills")}
            placeholder="Lista tus habilidades técnicas y profesionales separadas por comas"
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Ej: Microsoft Office, gestión de proyectos, desarrollo web, liderazgo, etc.</p>
        </div>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Palabras Clave para ATS</label>
          <textarea
            {...register("keywords")}
            placeholder="Palabras clave adicionales separadas por comas que puedan ser relevantes para los sistemas ATS"
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">Añade términos específicos de tu industria o puesto deseado</p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;