import { Router } from "express";
import {
    createPeriodoController,
    getAllPeriodoController,
    getPeriodoByIdController,
    updatePeriodoController,
    archivarPeriodoController,
    desarchivarPeriodoController,
    deletePeriodoController,
} from "../controllers/periodo.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { periodoSchema, updateperiodoSchema } from "../schemas/periodo.schema.js";

const router = Router();

//Ruta para crear un periodo
router.post("/periodo", validateSchema(periodoSchema), createPeriodoController)

// Ruta para obtener todos los periodos
router.get("/periodos", getAllPeriodoController);

// Ruta para obtener un periodo
router.get("/periodo/:cod_periodo", getPeriodoByIdController);

// Ruta para actualizar un periodo
router.put("/periodo/:cod_periodo", validateSchema(updateperiodoSchema), updatePeriodoController);

// Ruta para eliminar un periodo
router.delete("/periodo/:cod_periodo", deletePeriodoController);

// Ruta para archivar el periodo
router.put('/periodo/archivar/:cod_periodo', archivarPeriodoController);

// Ruta para desarchivar el periodo
router.put('/periodo/desarchivar/:cod_periodo', desarchivarPeriodoController);

export default router;