import { z } from 'zod';

export const createTransaccionSchema = z.object({
    nro_cuenta: z.string({
        required_error: "El número de cuenta es requerido",
        invalid_type_error: "El número de cuenta debe ser un texto",
    })
        .min(1, { message: "El número de cuenta no puede estar vacío" })
        .regex(/^\d+$/, { message: "El número de cuenta debe contener solo números" }),

    descripcion: z.string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }),

    debe: z.string({
        required_error: "El debe es requerido",
        invalid_type_error: "El debe debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El debe debe ser un número válido" })
        .transform((val) => parseFloat(val)), // Convertir a número

    haber: z.string({
        required_error: "El haber es requerido",
        invalid_type_error: "El haber debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El haber debe ser un número válido" })
        .transform((val) => parseFloat(val)), // Convertir a número

    saldo: z.string({
        required_error: "El saldo es requerido",
        invalid_type_error: "El saldo debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El saldo debe ser un número válido" })
        .transform((val) => parseFloat(val)), // Convertir a número
});

// Esquema para actualizar una transacción
export const updateTransaccionSchema = z.object({
    nro_cuenta: z.string({
        required_error: "El número de cuenta es requerido",
        invalid_type_error: "El número de cuenta debe ser un texto",
    })
        .min(1, { message: "El número de cuenta no puede estar vacío" })
        .regex(/^\d+$/, { message: "El número de cuenta debe contener solo números" })
        .optional(),

    descripcion: z.string({
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }).optional(),

    debe: z.string({
        required_error: "El debe es requerido",
        invalid_type_error: "El debe debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El debe debe ser un número válido" })
        .transform((val) => parseFloat(val))
        .optional(),  // Hace que el campo sea opcional

    haber: z.string({
        required_error: "El haber es requerido",
        invalid_type_error: "El haber debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El haber debe ser un número válido" })
        .transform((val) => parseFloat(val))
        .optional(),  // Hace que el campo sea opcional

    saldo: z.string({
        required_error: "El saldo es requerido",
        invalid_type_error: "El saldo debe ser un texto",
    })
        .regex(/^\d+(\.\d+)?$/, { message: "El saldo debe ser un número válido" })
        .transform((val) => parseFloat(val))
        .optional(),  // Hace que el campo sea opcional
});