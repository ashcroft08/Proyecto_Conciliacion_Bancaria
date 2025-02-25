import { findAllConciliacionesByPeriodo, createConciliacion } from '../data-access/conciliacion.repository.js';

// Verificar si hay datos de conciliación para un período
export const verificarConciliacion = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const conciliaciones = await findAllConciliacionesByPeriodo(cod_periodo);

        if (conciliaciones.length === 0) {
            return res.status(200).json({ existeDatos: false });
        } else {
            return res.status(200).json({ existeDatos: true, conciliaciones });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Realizar una nueva conciliación
export const realizarConciliacion = async (req, res) => {
    try {
        const { cod_periodo } = req.body; // Recibimos el cod_periodo desde el body

        // Llamar a la función del repositorio para realizar la conciliación
        const nuevaConciliacion = await createConciliacion(cod_periodo);

        res.status(201).json({ message: 'Conciliación realizada exitosamente', nuevaConciliacion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};