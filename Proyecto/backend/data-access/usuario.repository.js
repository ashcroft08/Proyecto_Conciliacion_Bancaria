import { Usuario } from "../models/Usuario.js";
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Caducidad } from "../models/Caducidad.js";

export const createUsuario = async (usuarioData) => {
    const passwordHash = await bcrypt.hash(usuarioData.password, 10);
    return await Usuario.create({ ...usuarioData, password: passwordHash });
};

export const createCaducidad = async (caducidadData) => {
    return await Caducidad.create({ ...caducidadData })
}

export const findUsuarioByEmail = async (email) => {
    return await Usuario.findOne({ where: { email } });
};

export const findUsuarioById = async (cod_usuario) => {
    return await Usuario.findByPk(cod_usuario);
};

export const countUsuariosByRol = async (cod_rol) => {
    return await Usuario.count({ where: { cod_rol } });
};

export const updateUsuario = async (cod_usuario, updateData) => {
    return await Usuario.update(updateData, { where: { cod_usuario } });
};