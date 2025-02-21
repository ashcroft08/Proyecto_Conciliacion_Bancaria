import { Transaccion } from '../models/Transaccion.js';

export const createTransaccion = async (transaccionData) => {
    return await Transaccion.create(transaccionData);
};

export const findTransaccionById = async (cod_transaccion) => {
    return await Transaccion.findByPk(cod_transaccion);
};

export const findAllTransacciones = async () => {
    return await Transaccion.findAll();
};

export const updateTransaccion = async (cod_transaccion, updateData) => {
    return await Transaccion.update(updateData, { where: { cod_transaccion } });
};

export const deleteTransaccion = async (cod_transaccion) => {
    return await Transaccion.destroy({ where: { cod_transaccion } });
};