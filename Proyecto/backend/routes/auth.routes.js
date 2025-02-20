import { Router } from "express";
import {
    login,
    cambiarContrasena,
    logout,
    register,
    verifyToken,
    sendRecoveryCode,  // Importa la función de envío de código
    validateRecoveryCode,  // Importa la función de validación de código
    resetPassword,  // Importa la nueva función
} from "../controllers/auth.controller.js"; // Asegúrate de que esté definida en el controlador
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { loginLimiter } from '../middlewares/rateLimiters.js';

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), loginLimiter, login);

router.get("/verify-token", verifyToken);

router.post('/cambiar-contrasena', cambiarContrasena);

router.post("/logout", logout);

// Rutas para recuperación de contraseña
router.post("/recoverpassword", sendRecoveryCode);

router.post("/validate-recovery-code", validateRecoveryCode);

router.post("/reset-password", resetPassword);  // Nueva ruta para restablecer la contraseña

export default router;