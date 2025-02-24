import { Periodo } from '../models/Periodo.js';

export const createPeriodo = async (PeriodoData) => {
    return await Periodo.create(PeriodoData);
};

export const findAllPeriodo = async () => {
    return await Periodo.findAll({
        order: [['cod_periodo', 'ASC']]  // Ordena por cod_periodo de forma ascendente
    });
};

export const findPeriodoById = async (cod_periodo) => {
    return await Periodo.findByPk(cod_periodo);
};

export const updatePeriodo = async (cod_periodo, updateData) => {
    return await Periodo.update(updateData, { where: { cod_periodo } });
};

export const deletePeriodo = async (cod_periodo) => {
    return await Periodo.destroy({ where: { cod_periodo } });
};