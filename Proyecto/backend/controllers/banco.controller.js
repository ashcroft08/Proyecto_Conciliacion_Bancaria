import { createMultipleBancos, findAllBancosById } from '../data-access/banco.repository.js';
import csv from 'csv-parser';
import ExcelJS from 'exceljs';
import fs from 'fs';

export const getAllBancosByIdController = async (req, res) => {
    try {
        const { cod_periodo } = req.params;
        const bancos = await findAllBancosById(cod_periodo);
        if (bancos) {
            res.status(200).json(bancos);
        } else {
            res.status(404).json({ message: "Transacciones no encontradas" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

const processExcel = async (filePath) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                const header = worksheet.getRow(1).getCell(colNumber).value;
                rowData[header] = cell.value;
            });
            data.push(rowData);
        }
    });

    return data;
};

export const uploadBancos = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ningún archivo" });
        }

        const filePath = req.file.path;
        let bancosData;

        if (req.file.mimetype === 'text/csv') {
            bancosData = await processCSV(filePath);
        } else if (
            req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            req.file.mimetype === 'application/vnd.ms-excel'
        ) {
            bancosData = await processExcel(filePath);
        } else {
            return res.status(400).json({ message: "Formato de archivo no soportado" });
        }

        const mappedData = bancosData.map((item) => ({
            cod_periodo: req.params.cod_periodo,
            nro_cuenta: item.nro_cuenta,
            descripcion: item.descripcion,
            debe: parseFloat(item.debe),
            haber: parseFloat(item.haber),
            saldo: parseFloat(item.saldo),
        }));

        await createMultipleBancos(mappedData);

        fs.unlinkSync(filePath);

        res.status(201).json({ message: "Datos cargados exitosamente" });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        res.status(500).json({ message: "Error al procesar el archivo" });
    }
};