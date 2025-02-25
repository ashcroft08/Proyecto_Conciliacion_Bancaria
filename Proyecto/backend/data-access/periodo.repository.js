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

export const updateEstadoPeriodo = async (cod_periodo, nuevo_cod_estado) => {
    return await Periodo.update(
        { cod_estado: nuevo_cod_estado }, // Nuevos valores a actualizar
        { where: { cod_periodo: cod_periodo } } // Condición para encontrar el registro
    );
};

export const deletePeriodo = async (cod_periodo) => {
    return await Periodo.destroy({ where: { cod_periodo } });
};