import { z } from 'zod';

export const phoneRegex = /^(\+?[0-9]{1,4})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const yearRegex = /^\d{4}$/;

export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email demasiado corto')
    .max(100, 'Email demasiado largo'),
  phone: z.string()
    .regex(phoneRegex, 'Número de teléfono inválido'),
  address: z.string()
    .min(5, 'Dirección demasiado corta')
    .max(200, 'Dirección demasiado larga'),
});

export const educationSchema = z.object({
  institution: z.string()
    .min(2, 'Nombre de institución requerido')
    .max(100, 'Nombre de institución demasiado largo'),
  degree: z.string()
    .min(2, 'Título requerido')
    .max(100, 'Título demasiado largo'),
  year: z.string()
    .regex(yearRegex, 'Año inválido'),
});

export const experienceSchema = z.object({
  company: z.string()
    .min(2, 'Nombre de empresa requerido')
    .max(100, 'Nombre de empresa demasiado largo'),
  position: z.string()
    .min(2, 'Posición requerida')
    .max(100, 'Posición demasiado larga'),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string()
    .min(10, 'Descripción muy corta')
    .max(500, 'Descripción demasiado larga'),
});

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
  });
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}; 