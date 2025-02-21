import { z } from 'zod';

// Esquema para crear una transacción
export const createTransaccionSchema = z.object({
    nro_cuenta: z.string({
        required_error: "El número de cuenta es requerido",
        invalid_type_error: "El número de cuenta debe ser un texto",
    }).min(1, {
        message: "El número de cuenta no puede estar vacío",
    }),
    description: z.string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }),
    valor: z.number({
        required_error: "El valor es requerido",
        invalid_type_error: "El valor debe ser un número",
    }).positive({
        message: "El valor debe ser un número positivo",
    }),
    saldos: z.number({
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
    description: z.string({
        invalid_type_error: "La descripción debe ser un texto",
    }).min(1, {
        message: "La descripción no puede estar vacía",
    }).optional(),
    valor: z.number({
        invalid_type_error: "El valor debe ser un número",
    }).positive({
        message: "El valor debe ser un número positivo",
    }).optional(),
    saldos: z.number({
        invalid_type_error: "El saldo debe ser un número",
    }).positive({
        message: "El saldo debe ser un número positivo",
    }).optional(),
});