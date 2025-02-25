// data-access/conciliacion.repository.js
import { sequelize } from "../database/database.js";
import { Conciliacion } from '../models/Conciliacion.js';
import { Banco } from '../models/Banco.js';
import { Transaccion } from '../models/Transaccion.js';
import { RevisionAutomatizada } from "../models/RevisionAutomatizada.js";
import { Estado } from "../models/Estado.js";

// Obtener conciliaciones por período
export const findAllConciliacionesByPeriodo = async (cod_periodo) => {
    return await Conciliacion.findAll({ where: { cod_periodo } });
};

// Crear una nueva conciliación
export const createConciliacion = async (cod_periodo, transaccionesLibro, transaccionesBanco, estadoInicial, revisionAutomaticaMatch, revisionAutomaticaNoMatch, transaction) => {
    const nuevasConciliaciones = [];

    // Conciliar transacciones del libro
    for (const transaccion of transaccionesLibro) {
        const match = transaccionesBanco.find(
            (t) =>
                t.nro_cuenta === transaccion.nro_cuenta &&
                t.debe === transaccion.debe &&
                t.haber === transaccion.haber
        );

        nuevasConciliaciones.push({
            cod_periodo,
            cod_transaccion: transaccion.cod_transaccion,
            cod_transaccion_banco: match ? match.cod_transaccion_banco : null,
            cod_revision_automatizada: match
                ? revisionAutomaticaMatch.cod_revision_automatizada
                : revisionAutomaticaNoMatch.cod_revision_automatizada,
            cod_estado: estadoInicial.cod_estado,
        });
    }

    // Conciliar transacciones solo del banco
    for (const transaccion of transaccionesBanco) {
        const match = transaccionesLibro.find(
            (t) =>
                t.nro_cuenta === transaccion.nro_cuenta &&
                t.debe === transaccion.debe &&
                t.haber === transaccion.haber
        );

        if (!match) {
            nuevasConciliaciones.push({
                cod_periodo,
                cod_transaccion: null,
                cod_transaccion_banco: transaccion.cod_transaccion_banco,
                cod_revision_automatizada: revisionAutomaticaNoMatch.cod_revision_automatizada,
                cod_estado: estadoInicial.cod_estado,
            });
        }
    }

    await Conciliacion.bulkCreate(nuevasConciliaciones, { transaction });
};

// Actualizar conciliación
export const updateConciliacion = async (cod_periodo, transaccionesLibro, transaccionesBanco, estadoInicial, revisionAutomaticaMatch, revisionAutomaticaNoMatch, transaction) => {
    // Eliminar conciliaciones existentes para este período
    await Conciliacion.destroy({ where: { cod_periodo }, transaction });

    // Crear nuevas conciliaciones
    await createConciliacion(cod_periodo, transaccionesLibro, transaccionesBanco, estadoInicial, revisionAutomaticaMatch, revisionAutomaticaNoMatch, transaction);
};