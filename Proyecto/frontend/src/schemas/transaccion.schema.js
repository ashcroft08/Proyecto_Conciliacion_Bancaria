import { z } from 'zod';

// Esquema para crear una transacción
export const createTransaccionSchema = z.object({
    nro_cuenta: z.string({
        required_error: "El número de cuenta es requerido",
        invalid_type_error: "El número de cuenta debe ser un texto",
    }).min(1, {
        message: "El número de cuenta no puede estar vacío",
    }),
    descripcion: z.string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }),
    debe: z.number({
        required_error: "El debe es requerido",
        invalid_type_error: "El debe deberia ser un número",
    }).positive({
        message: "El debe deberia ser un número positivo",
    }),
    haber: z.number({
        required_error: "El haber es requerido",
        invalid_type_error: "El haber debe ser un número",
    }).positive({
        message: "El haber debe ser un número positivo",
    }),
    saldo: z.number({
        required_error: "El saldo es requerido",
        invalid_type_error: "El saldo debe ser un número",
    }).positive({
        message: "El saldo debe ser un número positivo",
    }),
});

// Esquema para actualizar una transacción
export const updateTransaccionSchema = z.object({
    nro_cuenta: z.string({
        invalid_type_error: "El número de cuenta debe ser un texto",
    }).min(1, {
        message: "El número de cuenta no puede estar vacío",
    }).optional(),
    descripcion: z.string({
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }).optional(),
    debe: z.number({
        invalid_type_error: "El debe deberia ser un número",
    }).positive({
        message: "El debe deberia ser un número positivo",
    }).optional(),
    haber: z.number({
        invalid_type_error: "El haber debe ser un número",
    }).positive({
        message: "El haber debe ser un número positivo",
    }).optional(),
    saldos: z.number({
        invalid_type_error: "El saldo debe ser un número",
    }).positive({
        message: "El saldo debe ser un número positivo",
    }).optional(),
});