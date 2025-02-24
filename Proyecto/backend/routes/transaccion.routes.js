import { Router } from "express";
import {
    createTransaccionController,
    getAllTransaccionByIdController,
    getTransaccionByIdController,
    updateTransaccionController,
    deleteTransaccionController,
} from "../controllers/transaccion.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTransaccionSchema, updateTransaccionSchema } from "../schemas/transaccion.schema.js";

const router = Router();

//Ruta para crear una transaccion
router.post("/transaccion", validateSchema(createTransaccionSchema), createTransaccionController)

// Ruta para obtener todas las transacciones
router.get("/transacciones/:cod_periodo", getAllTransaccionByIdController);

// Ruta para obtener una transaccion
router.get("/transaccion/:cod_transaccion", getTransaccionByIdController);

// Ruta para actualizar una transaccion
router.put("/transaccion/:cod_transaccion", validateSchema(updateTransaccionSchema), updateTransaccionController);

// Ruta para eliminar una transacción
router.delete("/transaccion/:cod_transaccion", deleteTransaccionController);

export default router;