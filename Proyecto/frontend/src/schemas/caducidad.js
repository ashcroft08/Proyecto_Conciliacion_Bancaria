import { z } from 'zod';

export const caducidadSchema = z.object({
    cod_rol: z.string({
        required_error: 'El rol es obligatorio',
    }),
    nombres: z.string().min(2, {
        required_error: 'Los nombres son obligatorios',
    }),
    apellidos: z.string().min(2, {
        required_error: 'Los apellidos son obligatorios',
    }),
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
    }).email({
        message: 'Correo electrónico inválido',
    }),
    fecha_expiracion: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de expiración debe estar en formato YYYY-MM-DD" }) // Validar formato
        .refine(
            (value) => {
                const selectedDate = new Date(value); // Convertir la cadena a fecha
                const currentDate = new Date(); // Obtener la fecha actual
                return selectedDate > currentDate; // Validar que la fecha sea posterior a la actual
            },
            { message: "La fecha de expiración debe ser posterior a la fecha actual" }
        ),
    password: z
        .string({
            required_error: 'La contraseña es obligatoria',
        })
        .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
        .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
        .regex(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
        .regex(/[0-9]/, { message: 'Debe contener al menos un número' })
        .regex(/[\W_]/, { message: 'Debe contener al menos un carácter especial' }),
    confirmPassword: z.string({
        required_error: 'La confirmación es obligatoria',
    }),
})
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Las contraseñas no coinciden',
            });
        }
    });

// Esquema de edición
export const editSchema = z.object({
    nombres: z.string().min(2, {
        required_error: 'Los nombres son obligatorios',
    }),
    apellidos: z.string().min(2, {
        required_error: 'Los apellidos son obligatorios',
    }),
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
    }).email({
        message: 'Correo electrónico inválido',
    }),
    fecha_expiracion: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de expiración debe estar en formato YYYY-MM-DD" }) // Validar formato
        .refine(
            (value) => {
                const selectedDate = new Date(value); // Convertir la cadena a fecha
                const currentDate = new Date(); // Obtener la fecha actual
                return selectedDate > currentDate; // Validar que la fecha sea posterior a la actual
            },
            { message: "La fecha de expiración debe ser posterior a la fecha actual" }
        ),
});