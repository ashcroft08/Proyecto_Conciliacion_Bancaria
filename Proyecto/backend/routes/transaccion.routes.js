import { Router } from "express";
import {
    createTransaccionController,
    getTransaccionByIdController,
    getAllTransaccionesController,
    updateTransaccionController,
    deleteTransaccionController,
} from "../controllers/transaccion.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTransaccionSchema, updateTransaccionSchema } from "../schemas/transaccion.schema.js";

const router = Router();

// Ruta para crear una transacción
router.post("/transacciones", validateSchema(createTransaccionSchema), createTransaccionController);

// Ruta para obtener una transacción por ID
router.get("/transacciones/:cod_transaccion", getTransaccionByIdController);

// Ruta para obtener todas las transacciones
router.get("/transacciones", getAllTransaccionesController);

// Ruta para actualizar una transacción
router.put("/transacciones/:cod_transaccion", validateSchema(updateTransaccionSchema), updateTransaccionController);

// Ruta para eliminar una transacción
router.delete("/transacciones/:cod_transaccion", deleteTransaccionController);

export default router;