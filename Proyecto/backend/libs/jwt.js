// libs/jwt.js
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { obtenerConfiguracion } from '../controllers/configuracionToken.controller.js';

export async function createAccessToken(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            // Obtener el valor de expiresIn desde la base de datos
            const config = await obtenerConfiguracion();
            const expiresIn = config.expiresIn;

            // Generar el token
            jwt.sign(
                payload,
                TOKEN_SECRET,
                { expiresIn },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        } catch (error) {
            reject(error);
        }
    });
}