// controllers/userController.js
import {
    findUserById,
    findAdminsExcludingUser,
    findUsersByRole,
    deleteUserById,
    updateUserById,
    updateUserPasswordById,
    findUserByEmail,
    comparePasswords,
    hashPassword
} from '../data-access/user.repository.js';

export const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.params.cod_usuario);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el usuario.", error: error.message });
    }
};

export const getUsersAdmin = async (req, res) => {
    try {
        const userId = req.user.cod_usuario;
        const admins = await findAdminsExcludingUser(userId);
        res.json(admins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserGerente = async (req, res) => {
    try {
        const gerente = await findUsersByRole(3);
        res.json(gerente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsersAuditor = async (req, res) => {
    try {
        const auditor = await findUsersByRole(4);
        res.json(auditor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserJefeContable = async (req, res) => {
    try {
        const jefeContable = await findUsersByRole(5);
        res.json(jefeContable);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsersContador = async (req, res) => {
    try {
        const contadores = await findUsersByRole(6);
        res.json(contadores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { cod_usuario } = req.params;
        const currentUserId = req.user.cod_usuario;

        if (parseInt(cod_usuario) === currentUserId) {
            return res.status(403).json({
                message: "No puedes eliminar tu propia cuenta mientras estás logueado.",
            });
        }

        const deletedUser = await deleteUserById(cod_usuario);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { cod_usuario } = req.params;
        const { nombres, apellidos, email } = req.body;

        const user = await findUserById(cod_usuario);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const [emailConflict] = await Promise.all([
            email && email !== user.email ? findUserByEmail(email) : null,
        ]);

        if (emailConflict) {
            return res.status(400).json({ message: "Ya existe un usuario con este correo." });
        }

        const updates = {};
        if (nombres) updates.nombres = nombres;
        if (apellidos) updates.apellidos = apellidos;
        if (email) updates.email = email;

        await updateUserById(cod_usuario, updates);

        res.status(201).json({
            cod_usuario: user.cod_usuario,
            cod_rol: user.cod_rol,
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserPassword = async (req, res) => {
    try {
        const { cod_usuario } = req.params;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden." });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
        }

        const user = await findUserById(cod_usuario);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const isMatch = await comparePasswords(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta. Intente de nuevo." });
        }

        const isNewPasswordSame = await comparePasswords(newPassword, user.password);
        if (isNewPasswordSame) {
            return res.status(400).json(["La nueva contraseña no puede ser igual a la actual."]);
        }

        const hashedPassword = await hashPassword(newPassword);
        await updateUserPasswordById(cod_usuario, hashedPassword);

        res.status(201).json({
            cod_usuario: user.cod_usuario,
            message: "Contraseña actualizada correctamente.",
        });
    } catch (error) {
        console.error("Error en updateUserPassword:", error);
        res.status(500).json({ message: "Error al actualizar la contraseña. Por favor, inténtelo de nuevo." });
    }
};