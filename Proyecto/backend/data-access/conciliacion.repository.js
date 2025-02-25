// data-access/conciliacion.repository.js
import { sequelize } from '../database/database.js'; // Asegúrate de que la ruta sea correcta
import { Conciliacion } from '../models/Conciliacion.js';
import { Banco } from '../models/Banco.js';
import { Transaccion } from '../models/Transaccion.js';
import { Periodo } from '../models/Periodo.js';

// Buscar conciliaciones por período
export const findAllConciliacionesByPeriodo = async (cod_periodo) => {
    return await Conciliacion.findAll({ where: { cod_periodo } });
};

// Crear una nueva conciliación
export const createConciliacion = async (cod_periodo) => {
    try {
        // Realizar la consulta para obtener los datos de transacciones y banco
        const resultados = await Transaccion.findAll({
            attributes: ['cod_transaccion', 'debe', 'haber'],
            include: [{
                model: Banco,
                attributes: ['cod_transaccion_banco', 'debe', 'haber'],
                where: { cod_periodo },
                required: false, // LEFT JOIN
                include: [{
                    model: Periodo,
                    attributes: [], // No necesitas seleccionar columnas de Periodo
                    where: { cod_periodo }
                }]
            }],
            where: { cod_periodo }
        });

        // Mapear los resultados para insertarlos en la tabla Conciliacion
        const datosConciliacion = resultados.map((transaccion) => {
            const banco = transaccion.Banco; // Datos de la tabla Banco (puede ser null por el LEFT JOIN)

            return {
                cod_periodo,
                cod_transaccion: transaccion.cod_transaccion,
                cod_transaccion_banco: banco ? banco.cod_transaccion_banco : null,
                cod_revision_automatizada: (banco && banco.debe === transaccion.debe && banco.haber === transaccion.haber) ? 1 : 2,
                cod_revision: null, // Se llena con null
                cod_estado: 1 // Se llena con 1
            };
        });

        // Insertar los datos en la tabla Conciliacion
        const nuevasConciliaciones = await Conciliacion.bulkCreate(datosConciliacion);
        return nuevasConciliaciones;
    } catch (error) {
        throw new Error(`Error al realizar la conciliación: ${error.message}`);
    }
};