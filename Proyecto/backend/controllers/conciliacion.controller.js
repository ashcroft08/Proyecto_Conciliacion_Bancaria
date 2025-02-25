// controllers/conciliacion.controller.js
import { findAllConciliacionesByPeriodo, createConciliacion, updateConciliacion } from '../data-access/conciliacion.repository.js';
import { sequelize } from "../database/database.js";
import { Transaccion } from '../models/Transaccion.js';
import { Banco } from '../models/Banco.js';
import { RevisionAutomatizada } from "../models/RevisionAutomatizada.js";
import { Estado } from "../models/Estado.js";
import { Conciliacion } from '../models/Conciliacion.js';
import { Revision } from "../models/Revision.js";

// Obtener conciliaciones por período
export const getConciliacionesByPeriodo = async (req, res) => {
    try {
        const { cod_periodo } = req.params;

        // Obtener conciliaciones con datos relacionados
        const conciliaciones = await Conciliacion.findAll({
            where: { cod_periodo },
            include: [
                {
                    model: Transaccion,
                    attributes: ["nro_cuenta", "descripcion", "debe", "haber"],
                },
                {
                    model: Banco,
                    attributes: ["nro_cuenta", "descripcion", "debe", "haber"],
                },
                {
                    model: RevisionAutomatizada,
                    attributes: ["coincide"], // Sistema (true/false)
                },
                {
                    model: Revision,
                    attributes: ["accion"], // Auditor (true/false/null)
                },
            ],
        });

        if (conciliaciones.length === 0) {
            return res.status(200).json({ existeDatos: false });
        }

        // Formatear los datos para el frontend
        const formattedConciliaciones = conciliaciones.map((conciliacion) => ({
            nro_cuenta: conciliacion.Transaccion?.nro_cuenta || conciliacion.Banco?.nro_cuenta,
            descripcion: conciliacion.Transaccion?.descripcion || conciliacion.Banco?.descripcion,
            banco_debe: conciliacion.Banco?.debe || 0,
            banco_haber: conciliacion.Banco?.haber || 0,
            libro_debe: conciliacion.Transaccion?.debe || 0,
            libro_haber: conciliacion.Transaccion?.haber || 0,
            sistema: conciliacion.RevisionAutomatizada?.accion || false,
            auditor: conciliacion.Revision?.accion || null,
        }));

        return res.status(200).json({ existeDatos: true, conciliaciones: formattedConciliaciones });
    } catch (error) {
        console.error("Error al obtener conciliaciones:", error);
        res.status(500).json({ message: error.message });
    }
};

// Crear nueva conciliación
export const createConciliacionController = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { cod_periodo } = req.params;

        // Obtener transacciones del libro y del banco para el período
        const transaccionesLibro = await Transaccion.findAll({
            where: { cod_periodo },
        });

        const transaccionesBanco = await Banco.findAll({
            where: { cod_periodo },
        });

        // Estados predefinidos
        const estadoInicial = await Estado.findOne({
            where: { estado: true }, // Estado activo
        });

        const revisionAutomaticaMatch = await RevisionAutomatizada.findOne({
            where: { coincide: true }, // Coincidencia encontrada
        });

        const revisionAutomaticaNoMatch = await RevisionAutomatizada.findOne({
            where: { coincide: false }, // No coincidencia
        });

        // Realizar la conciliación
        await createConciliacion(
            cod_periodo,
            transaccionesLibro,
            transaccionesBanco,
            estadoInicial,
            revisionAutomaticaMatch,
            revisionAutomaticaNoMatch,
            t
        );

        await t.commit();
        res.json({ message: "Conciliación realizada exitosamente" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};

// Actualizar conciliación
export const updateConciliacionController = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { cod_periodo } = req.params;

        // Obtener transacciones del libro y del banco para el período
        const transaccionesLibro = await Transaccion.findAll({
            where: { cod_periodo },
        });

        const transaccionesBanco = await Banco.findAll({
            where: { cod_periodo },
        });

        // Estados predefinidos
        const estadoInicial = await Estado.findOne({
            where: { estado: true }, // Estado activo
        });

        const revisionAutomaticaMatch = await RevisionAutomatizada.findOne({
            where: { coincide: true }, // Coincidencia encontrada
        });

        const revisionAutomaticaNoMatch = await RevisionAutomatizada.findOne({
            where: { coincide: false }, // No coincidencia
        });

        // Actualizar la conciliación
        await updateConciliacion(
            cod_periodo,
            transaccionesLibro,
            transaccionesBanco,
            estadoInicial,
            revisionAutomaticaMatch,
            revisionAutomaticaNoMatch,
            t
        );

        await t.commit();
        res.json({ message: "Conciliación actualizada exitosamente" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};