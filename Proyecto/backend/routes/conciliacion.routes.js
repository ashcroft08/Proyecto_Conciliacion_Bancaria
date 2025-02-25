import { Router } from 'express';
import { verificarConciliacion, realizarConciliacion } from '../controllers/conciliacion.controller.js';

const router = Router();

// Ruta para verificar si hay datos de conciliación
router.get('/conciliacion/verificar/:cod_periodo', verificarConciliacion);

// Ruta para realizar una nueva conciliación
router.post('/conciliacion/realizar/:cod_periodo', realizarConciliacion);

export default router;