// data-access/banco.repository.js
import { Banco } from '../models/Banco.js';

// Crear una nueva transacción bancaria
export const createBanco = async (bancoData) => {
    return await Banco.create(bancoData);
};

// Crear múltiples transacciones bancarias
export const createMultipleBancos = async (bancosData) => {
    return await Banco.bulkCreate(bancosData);
};

// Obtener todas las transacciones bancarias
export const getAllBancos = async () => {
    return await Banco.findAll();
};

export const findAllBancosById = async (cod_periodo) => {
    return await Banco.findAll({ where: { cod_periodo } });
}