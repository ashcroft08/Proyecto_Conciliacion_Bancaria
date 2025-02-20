import { ConfiguracionToken } from '../models/ConfiguracionToken.js';

// Función para obtener la última configuración
export const obtenerUltimaConfiguracion = async () => {
    return await ConfiguracionToken.findOne({
        order: [['cod_token', 'DESC']], // Obtener el último registro
    });
};

// Función para actualizar la configuración
export const actualizarConfiguracion = async (config, expiresIn) => {
    config.expiresIn = expiresIn;
    config.updatedAt = new Date(); // Actualizar la fecha de modificación
    return await config.save(); // Guardar los cambios en la base de datos
};