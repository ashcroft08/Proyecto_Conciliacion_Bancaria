import { createAccessToken } from '../libs/jwt.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { sendEmail } from '../utils/mailer.js';
import crypto from 'crypto';
import {
    createUsuario,
    findUsuarioByEmail,
    findUsuarioById,
    countUsuariosByRol,
    updateUsuario,
} from '../data-access/usuario.repository.js';
import { RecoverPassword } from '../models/RecoverPassword.js';

export const register = async (req, res) => {
    try {
        const { nombres, apellidos, email, password, confirmPassword, cod_rol } = req.body;

        const codRolNumber = parseInt(cod_rol, 10);
        if (isNaN(codRolNumber) || codRolNumber < 2 || codRolNumber > 4) {
            return res.status(400).json(["Rol inválido"]);
        }

        if (password !== confirmPassword) {
            return res.status(400).json(["Las contraseñas no coinciden"]);
        }

        // Límite de administradores
        if (codRolNumber === 1) {
            const adminCount = await countUsuariosByRol(1);
            if (adminCount >= 3) return res.status(400).json(["Límite de administradores alcanzado"]);
        }

        // Crear nuevo usuario
        const newUser = await createUsuario({
            cod_rol: codRolNumber,
            nombres,
            apellidos,
            email,
            password,
        });

        res.status(201).json({
            cod_usuario: newUser.cod_usuario,
            cod_rol: newUser.cod_rol,
            nombres: newUser.nombres,
            apellidos: newUser.apellidos,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Iniciando proceso de login para:', email);

        // Buscar usuario por email
        const userFound = await findUsuarioByEmail(email);
        if (!userFound) {
            console.log('Usuario no encontrado:', email);
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        console.log('Usuario encontrado:', userFound.cod_usuario);

        // Verificar si la cuenta está bloqueada
        if (userFound.is_locked) {
            const lockDuration = 15 * 60 * 1000; // 15 minutos en milisegundos
            const currentTime = new Date();
            const lockTime = new Date(userFound.lock_time);

            // Verificar si han pasado 15 minutos desde el bloqueo
            if (currentTime - lockTime < lockDuration) {
                console.log('Cuenta bloqueada para:', email);
                return res.status(403).json({ message: "Cuenta bloqueada. Intenta de nuevo más tarde." });
            } else {
                // Restablecer el estado de bloqueo
                await updateUsuario(userFound.cod_usuario, {
                    is_locked: false,
                    login_attempts: 0,
                    lock_time: null,
                });
                console.log('Cuenta desbloqueada para:', email);
            }
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            userFound.login_attempts += 1; // Incrementar intentos fallidos

            // Verificar si se alcanzaron los 5 intentos
            if (userFound.login_attempts >= 5) {
                await updateUsuario(userFound.cod_usuario, {
                    is_locked: true,
                    lock_time: new Date(),
                });
            }

            await updateUsuario(userFound.cod_usuario, { login_attempts: userFound.login_attempts });
            console.log('Contraseña incorrecta para:', email);
            return res.status(400).json({ message: "Contraseña incorrecta. Intentos restantes: " + (5 - userFound.login_attempts) });
        }

        // Si la contraseña es correcta, restablecer intentos y estado de bloqueo
        await updateUsuario(userFound.cod_usuario, {
            login_attempts: 0,
            is_locked: false,
            lock_time: null,
        });
        console.log('Contraseña correcta para:', email);

        // Generar token
        const token = await createAccessToken({ cod_usuario: userFound.cod_usuario });
        console.log('Token generado para:', email);

        // Configurar cookie
        res.cookie("token", token);

        // Responder con datos del usuario
        res.json({
            cod_usuario: userFound.cod_usuario,
            cod_rol: userFound.cod_rol,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        try {
            const userFound = await findUsuarioById(user.cod_usuario);
            if (!userFound) return res.sendStatus(401);

            return res.json({
                cod_usuario: userFound.cod_usuario,
                cod_rol: userFound.cod_rol,
                nombres: userFound.nombres,
                apellidos: userFound.apellidos,
                email: userFound.email,
            });

        } catch (err) {
            return res.sendStatus(500);
        }
    });
};

export const sendRecoveryCode = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Generar un código aleatorio único
        const code = crypto.randomBytes(3).toString("hex").toUpperCase();
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // Expira en 3 minutos

        // Eliminar códigos anteriores para el mismo usuario
        await RecoverPassword.destroy({ where: { cod_usuario: user.cod_usuario } });

        // Crear el registro de recuperación de contraseña
        await RecoverPassword.create({
            code,
            expiresAt,
            cod_usuario: user.cod_usuario,
        });

        // Enviar el código por correo electrónico
        const message = `Tu código de recuperación es: <strong>${code}</strong>. Este código expirará en 3 minutos.`;
        await sendEmail(email, "Código de Recuperación de Contraseña", message);

        res.json({ message: "Código de recuperación enviado a tu correo electrónico" });
    } catch (error) {
        console.error("Error en el proceso de recuperación de contraseña:", error);
        res.status(500).json({ message: "Error al enviar el código de recuperación" });
    }
};

export const validateRecoveryCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Buscar el código de recuperación en la base de datos
        const recoveryRecord = await RecoverPassword.findOne({
            where: { cod_usuario: user.cod_usuario, code },
        });

        // Verificar si el código es válido y no ha expirado
        if (!recoveryRecord) {
            return res.status(400).json({ message: "Código incorrecto" });
        }

        if (new Date() > new Date(recoveryRecord.expiresAt)) {
            return res.status(400).json({ message: "El código ha expirado" });
        }

        res.json({ message: "Código válido, puedes restablecer tu contraseña" });
    } catch (error) {
        console.error("Error al validar el código:", error);
        res.status(500).json({ message: "Error al validar el código" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    try {
        // Buscar el usuario por correo electrónico
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Buscar el código de recuperación en la base de datos
        const recoveryRecord = await RecoverPassword.findOne({
            where: { cod_usuario: user.cod_usuario, code },
        });

        // Verificar si el código es válido y no ha expirado
        if (!recoveryRecord) {
            return res.status(400).json({ message: "Código incorrecto" });
        }

        if (new Date() > new Date(recoveryRecord.expiresAt)) {
            return res.status(400).json({ message: "El código ha expirado" });
        }

        // Validar la nueva contraseña
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        await Usuario.update({ password: hashedPassword }, { where: { cod_usuario: user.cod_usuario } });

        // Eliminar el registro de recuperación
        await recoveryRecord.destroy();

        res.json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        res.status(500).json({ message: "Error al restablecer la contraseña" });
    }
};