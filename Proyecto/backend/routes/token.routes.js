import { Router } from 'express';
import { obtenerConfiguracionToken, actualizarConfiguracionToken } from '../controllers/configuracionToken.controller.js';

const router = Router();

// Ruta para obtener la configuración
router.get('/configuracion-token', obtenerConfiguracionToken);

// Ruta para actualizar la configuración
router.put('/configuracion-token', actualizarConfiguracionToken);

export default router;