// routes/banco.routes.js
import { Router } from 'express';
import { uploadBancos, getAllBancosByIdController } from '../controllers/banco.controller.js';
import multer from 'multer';

const router = Router();

// Ruta para obtener todas las transacciones
router.get("/banco/transacciones/:cod_periodo", getAllBancosByIdController);

const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para almacenar archivos

// Ruta para cargar transacciones bancarias desde un archivo
router.post('/upload', upload.single('file'), uploadBancos);

export default router;