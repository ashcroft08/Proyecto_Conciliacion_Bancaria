// validators/auth.schema.js
import { z } from 'zod';

// Esquema de registro
export const registerSchema = z.object({
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

// Esquema de login
export const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo electrónico es obligatorio',
    }).email({
        message: 'El correo electrónico no es válido',
    }),
    password: z.string({
        required_error: 'La contraseña es obligatoria',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
    }),
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
});

//Esquema de contraseña
export const passwordSchema = z.object({
    currentPassword: z
        .string({
            required_error: 'La contraseña actual es obligatoria',
        }),
    newPassword: z
        .string({
            required_error: 'La nueva contraseña es obligatoria',
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
        if (data.newPassword !== data.confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Las contraseñas no coinciden',
            });
        }
    });