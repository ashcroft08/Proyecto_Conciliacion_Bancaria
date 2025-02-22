// validators/auth.schema.js
import { z } from 'zod';

// Función para validar cédula
const validarCedula = (cedula) => {
    if (cedula.length !== 10) return false;
    let par = 0, imp = 0, suma = 0;
    for (let i = 0; i < 9; i++) {
        const digito = parseInt(cedula[i]);
        if (i % 2 === 0) { // Impares (índices pares en base 0)
            const mult = digito * 2;
            imp += mult > 9 ? mult - 9 : mult;
        } else { // Pares
            par += digito;
        }
    }
    suma = par + imp;
    const digitoVerificador = parseInt(cedula[9]);
    const resultado = (suma % 10 === 0) ? 0 : 10 - (suma % 10);
    return resultado === digitoVerificador;
};

// Esquema de registro
export const registerSchema = z.object({
    cod_rol: z.string({
        required_error: 'El rol es obligatorio',
    }),
    cedula: z.string().min(2,{
        required_error: 'La cédula es obligatoria',
    }).refine(validarCedula, {
        message: 'La cédula es inválida',
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
    cedula: z.string({
        required_error: 'La cédula es obligatoria',
    }).refine(validarCedula, {
        message: 'La cédula es inválida',
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