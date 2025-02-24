import { z } from 'zod';

// Esquema para crear una transacción
export const createTransaccionSchema = z.object({
    nro_cuenta: z.string({
        required_error: "El número de cuenta es requerido",
        invalid_type_error: "El número de cuenta debe ser un texto",
    })
        .min(1, { message: "El número de cuenta no puede estar vacío" })
        .regex(/^\d+$/, { message: "El número de cuenta debe contener solo números" })
    ,
    descripcion: z.string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }),
    debe: z.number({
        required_error: "El debe es requerido",
        invalid_type_error: "El debe debería ser un número",
    }).min(0, {
        message: "El debe debe ser un número mayor o igual a 0",
    }),
    haber: z.number({
        required_error: "El haber es requerido",
        invalid_type_error: "El haber debe ser un número",
    }).min(0, {
        message: "El haber debe ser un número mayor o igual a 0",
    }),
    saldo: z.number({
        required_error: "El saldo es requerido",
        invalid_type_error: "El saldo debe ser un número",
    }).min(0, {
        message: "El saldo debe ser un número mayor o igual a 0",
    }),
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
    debe: z.number({
        invalid_type_error: "El debe debería ser un número",
    })
        .min(0, {
            message: "El debe debe ser un número mayor o igual a 0",
        })
        .optional(),  // Hace que el campo sea opcional

    haber: z.number({
        invalid_type_error: "El haber debe ser un número",
    })
        .min(0, {
            message: "El haber debe ser un número mayor o igual a 0",
        })
        .optional(),  // Hace que el campo sea opcional

    saldo: z.number({
        invalid_type_error: "El saldo debe ser un número",
    })
        .min(0, {
            message: "El saldo debe ser un número mayor o igual a 0",
        })
        .optional(),  // Hace que el campo sea opcional
});