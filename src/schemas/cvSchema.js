import { z } from 'zod';

const languageLevels = ['Básico', 'Intermedio', 'Avanzado', 'Nativo'];

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre es demasiado largo'),
    email: z.string()
      .email('Email inválido'),
    phone: z.string()
      .regex(/^\+?[0-9]{8,15}$/, 'Número de teléfono inválido'),
  }),
  summary: z.string()
    .min(50, 'El resumen debe tener al menos 50 caracteres')
    .max(500, 'El resumen es demasiado largo')
    .optional(),
  education: z.array(
    z.object({
      title: z.string()
        .min(2, 'El título es requerido')
        .max(100, 'El título es demasiado largo'),
      institution: z.string()
        .min(2, 'La institución es requerida')
        .max(100, 'El nombre de la institución es demasiado largo'),
      startDate: z.string()
        .regex(/^\d{4}$/, 'Ingrese un año válido')
        .refine(val => parseInt(val) >= 1900 && parseInt(val) <= 2099, 'El año debe estar entre 1900 y 2099'),
      endDate: z.string()
        .regex(/^\d{4}$/, 'Ingrese un año válido')
        .refine(val => !val || (parseInt(val) >= 1900 && parseInt(val) <= 2099), 'El año debe estar entre 1900 y 2099')
        .nullable()
        .optional(),
      currentlyStudying: z.boolean()
        .default(false),
    })
  ).min(1, 'Debe agregar al menos una entrada de educación'),
  workExperience: z.array(
    z.object({
      position: z.string()
        .min(2, 'El puesto es requerido'),
      company: z.string()
        .min(2, 'La empresa es requerida'),
      startDate: z.string()
        .regex(/^\d{4}$/, 'Ingrese un año válido')
        .refine(val => parseInt(val) >= 1900 && parseInt(val) <= 2099, 'El año debe estar entre 1900 y 2099'),
      endDate: z.string()
        .regex(/^\d{4}$/, 'Ingrese un año válido')
        .refine(val => !val || (parseInt(val) >= 1900 && parseInt(val) <= 2099), 'El año debe estar entre 1900 y 2099')
        .nullable()
        .optional(),
      currentlyWorking: z.boolean()
        .default(false),
      responsibilities: z.array(z.string())
        .optional()
        .default([]),
      achievements: z.array(z.string())
        .optional()
        .default([]),
      technologies: z.string()
        .optional()
        .default('')
    })
  )
  .optional()
  .default([]),
  skills: z.array(
    z.object({
      name: z.string()
        .min(2, 'El nombre de la habilidad es requerido'),
      level: z.number()
        .min(1, 'El nivel mínimo es 1')
        .max(5, 'El nivel máximo es 5'),
      category: z.enum(['technical', 'soft']),
    })
  ).default([]),
  certifications: z.array(
    z.object({
      name: z.string()
        .min(2, 'El nombre de la certificación es requerido'),
      issuer: z.string()
        .min(2, 'El nombre de la institución es requerido'),
      issueDate: z.string()
        .min(1, 'La fecha de emisión es requerida'),
      expiryDate: z.string()
        .optional()
        .nullable(),
      credentialId: z.string()
        .optional()
        .nullable(),
      credentialUrl: z.string()
        .url('URL inválida')
        .optional()
        .nullable(),
    })
  ).default([]),
  languages: z.array(
    z.object({
      name: z.string()
        .min(2, 'El nombre del idioma es requerido'),
      level: z.enum(languageLevels, {
        errorMap: () => ({ message: 'Nivel de idioma inválido' }),
      }),
      certification: z.string()
        .optional()
        .nullable(),
    })
  ).default([]),
}); 