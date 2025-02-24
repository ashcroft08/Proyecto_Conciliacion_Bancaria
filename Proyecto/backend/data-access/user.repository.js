import { Usuario } from "../models/Usuario.js";
import { Caducidad } from "../models/Caducidad.js";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

export const findUserById = async (cod_usuario) => {
    return await Usuario.findByPk(cod_usuario);
};

export const findAdminsExcludingUser = async (userId) => {
    return await Usuario.findAll({
        where: {
            cod_rol: 2,
            cod_usuario: {
                [Op.ne]: userId
            }
        },
        order: [['cod_usuario', 'ASC']]
    });
};

export const findUsersByRole = async (cod_rol) => {
    return await Usuario.findAll({
        where: { cod_rol },
        order: [['cod_usuario', 'ASC']]
    });
};

export const findUsersAuditor = async (cod_rol) => {
    return await Usuario.findAll({
        where: { cod_rol },
        include: [
            {
                model: Caducidad, // Incluir la relación con Caducidad
                attributes: ['fecha_expiracion'], // Seleccionar solo la fecha de expiración
            },
        ],
        attributes: ['cod_usuario', 'nombres', 'apellidos', 'email'], // Seleccionar solo estos campos de Usuario
        order: [['cod_usuario', 'ASC']],
    });
};

export const findUserAuditorById = async (cod_usuario) => {
    return await Usuario.findAll({
        where: { cod_usuario },
        include: [
            {
                model: Caducidad, // Incluir la relación con Caducidad
                attributes: ['fecha_expiracion'], // Seleccionar solo la fecha de expiración
            },
        ],
        attributes: ['cod_usuario', 'cod_rol', 'nombres', 'apellidos', 'email'], // Seleccionar solo estos campos de Usuario
        order: [['cod_usuario', 'ASC']],
    });
};

export const deleteUserById = async (cod_usuario) => {
    return await Usuario.destroy({
        where: { cod_usuario }
    });
};

export const updateUserById = async (cod_usuario, updates) => {
    const user = await Usuario.findByPk(cod_usuario); // Busca el usuario por su clave primaria
    if (user) {
        await user.update(updates); // Actualiza el usuario si existe
    }
    return user; // Devuelve el usuario actualizado (o null si no existe)
};

export const updateCaducidadByUserId = async (cod_usuario, updates) => {
    const caducidad = await Caducidad.findOne({ where: { cod_usuario } }); // Busca la caducidad por cod_usuario
    if (caducidad) {
        await caducidad.update(updates); // Actualiza la caducidad si existe
    }
    return caducidad; // Devuelve la caducidad actualizada (o null si no existe)
};

export const updateUserPasswordById = async (cod_usuario, hashedPassword) => {
    const user = await Usuario.findByPk(cod_usuario);
    if (user) {
        await user.update({ password: hashedPassword });
    }
    return user;
};

export const findUserByEmail = async (email) => {
    return await Usuario.findOne({ where: { email } });
};

export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};