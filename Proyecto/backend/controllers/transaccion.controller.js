import {
    createTransaccion,
    findAllTransaccionById,
    findTransaccionById,
    updateTransaccion,
    deleteTransaccion,
} from '../data-access/transaccion.repository.js';

export const createTransaccionController = async (req, res) => {
    try {
        const { cod_periodo, nro_cuenta, descripcion, debe, haber, saldo } = req.body;
        const newTransaccion = await createTransaccion({
            cod_periodo,
            nro_cuenta,
            descripcion,
            debe,
            haber,
            saldo,
        });
        res.status(201).json(newTransaccion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTransaccionByIdController = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const transacciones = await findAllTransaccionById(cod_periodo);
        if (transacciones) {
            res.status(200).json(transacciones);
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransaccionByIdController = async (req, res) => {
    try {
        const { cod_transaccion } = req.params;
        const transaccion = await findTransaccionById(cod_transaccion);
        if (transaccion) {
            res.status(200).json(transaccion);
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTransaccionController = async (req, res) => {
    try {
        const { cod_transaccion } = req.params;
        const updateData = req.body;
        const updated = await updateTransaccion(cod_transaccion, updateData);
        if (updated[0] === 1) {
            res.status(200).json({ message: "Transacción actualizada correctamente" });
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTransaccionController = async (req, res) => {
    try {
        const { cod_transaccion } = req.params;
        const deleted = await deleteTransaccion(cod_transaccion);
        if (deleted === 1) {
            res.status(200).json({ message: "Transacción eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};