import { createPeriodo, findAllPeriodo, findPeriodoById, updatePeriodo, deletePeriodo } from "../data-access/periodo.repository.js";

export const createPeriodoController = async (req, res) => {
    try {
        const { nombre_periodo, fecha_inicio, fecha_fin } = req.body;
        const newCreacionPeriodo = await createPeriodo({
            cod_estado: 2,
            nombre_periodo,
            fecha_inicio,
            fecha_fin,
        });
        res.status(201).json(newCreacionPeriodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPeriodoController = async (req, res) => {
    try {
        const creacionPeriodo = await findAllPeriodo();
        res.status(200).json(creacionPeriodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPeriodoByIdController = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const creacionPeriodo = await findPeriodoById(cod_periodo);
        if (creacionPeriodo) {
            res.status(200).json(creacionPeriodo);
        } else {
            res.status(404).json({ message: "Libro mayor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePeriodoController = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const updateData = req.body;
        const updated = await updatePeriodo(cod_periodo, updateData);
        if (updated[0] === 1) {
            res.status(200).json({ message: "Libro mayor actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Libro mayor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePeriodoController = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const deleted = await deletePeriodo(cod_periodo);
        if (deleted === 1) {
            res.status(200).json({ message: "Libro mayor eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Libro mayor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};