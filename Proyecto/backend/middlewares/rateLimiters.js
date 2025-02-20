import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 intentos por IP
    message: "Demasiados intentos, intenta nuevamente después de 15 minutos",
    standardHeaders: true,
    legacyHeaders: false
});