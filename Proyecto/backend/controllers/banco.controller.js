// controllers/banco.controller.js
import { createMultipleBancos } from '../data-access/banco.repository.js';
import csv from 'csv-parser';
import ExcelJS from 'exceljs'; // Reemplaza xlsx con exceljs
import fs from 'fs';

// Función para procesar archivos CSV
const processCSV = (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Función para procesar archivos Excel
const processExcel = async (filePath) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath); // Leer el archivo Excel
    const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja
    const data = [];

    // Recorrer las filas de la hoja
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Ignorar la primera fila (encabezados)
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                // Mapear los datos de la fila
                const header = worksheet.getRow(1).getCell(colNumber).value; // Obtener el encabezado
                rowData[header] = cell.value;
            });
            data.push(rowData);
        }
    });

    return data;
};

// Controlador para cargar transacciones bancarias desde un archivo
export const uploadBancos = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ningún archivo" });
        }

        const filePath = req.file.path;
        let bancosData;

        // Determinar el tipo de archivo
        if (req.file.mimetype === 'text/csv') {
            bancosData = await processCSV(filePath);
        } else if (
            req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            req.file.mimetype === 'application/vnd.ms-excel'
        ) {
            bancosData = await processExcel(filePath); // Usar await aquí
        } else {
            return res.status(400).json({ message: "Formato de archivo no soportado" });
        }

        // Validar y mapear los datos
        const mappedData = bancosData.map((item) => ({
            nro_cuenta: item.nro_cuenta,
            description: item.description,
            valor: parseFloat(item.valor),
            saldos: parseFloat(item.saldos),
        }));

        // Insertar los datos en la base de datos
        await createMultipleBancos(mappedData);

        // Eliminar el archivo temporal
        fs.unlinkSync(filePath);

        res.status(201).json({ message: "Datos cargados exitosamente" });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        res.status(500).json({ message: "Error al procesar el archivo" });
    }
};