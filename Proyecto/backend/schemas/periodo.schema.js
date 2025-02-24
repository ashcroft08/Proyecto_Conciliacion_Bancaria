import { z } from 'zod';

// Esquema Zod para validar la creación de una transacción
export const periodoSchema = z.object({
    nombre_periodo: z.string().min(1, "El nombre del período no puede estar vacío"), // Debe ser un string no vacío
    fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de inicio debe estar en formato YYYY-MM-DD"), // Formato de fecha YYYY-MM-DD
    fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de fin debe estar en formato YYYY-MM-DD"), // Formato de fecha YYYY-MM-DD
}).refine(
    (data) => new Date(data.fecha_fin) > new Date(data.fecha_inicio), // Validación personalizada
    {
        message: "La fecha de fin debe ser posterior a la fecha de inicio", // Mensaje de error
        path: ["fecha_fin"], // Ruta del campo que falló la validación
    }
);

export const updateperiodoSchema = z.object({
    nombre_periodo: z.string().min(1, "El nombre del período no puede estar vacío"), // Debe ser un string no vacío
    fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de inicio debe estar en formato YYYY-MM-DD"), // Formato de fecha YYYY-MM-DD
    fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de fin debe estar en formato YYYY-MM-DD"), // Formato de fecha YYYY-MM-DD
}).refine(
    (data) => new Date(data.fecha_fin) > new Date(data.fecha_inicio), // Validación personalizada
    {
        message: "La fecha de fin debe ser posterior a la fecha de inicio", // Mensaje de error
        path: ["fecha_fin"], // Ruta del campo que falló la validación
    }
);
