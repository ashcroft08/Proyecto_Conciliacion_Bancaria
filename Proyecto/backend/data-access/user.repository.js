import { Usuario } from "../models/Usuario.js";
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

export const deleteUserById = async (cod_usuario) => {
    return await Usuario.destroy({
        where: { cod_usuario }
    });
};

export const updateUserById = async (cod_usuario, updates) => {
    const user = await Usuario.findByPk(cod_usuario);
    if (user) {
        await user.update(updates);
    }
    return user;
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