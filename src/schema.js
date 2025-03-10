import { z } from "zod";

export const cvSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  education: z.array(
    z.object({
      degree: z.string().min(1, "El título es requerido"),
      institution: z.string().min(1, "La institución es requerida"),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
    })
  ).optional(),
});