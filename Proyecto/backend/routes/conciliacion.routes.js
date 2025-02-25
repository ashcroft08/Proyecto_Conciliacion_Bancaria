import express from "express";
import {
    getConciliacionesByPeriodo,
    createConciliacionController,
    updateConciliacionController
} from "../controllers/conciliacion.controller.js";

const router = express.Router();

// Obtener conciliaciones por periodo
router.get("/conciliacion/verificar/:cod_periodo", getConciliacionesByPeriodo);

// Realizar conciliación para un periodo
router.post("/conciliacion/realizar/:cod_periodo", createConciliacionController);

// Actualizar conciliación
router.put("/conciliacion/actualizar/:cod_periodo", updateConciliacionController);

export default router;