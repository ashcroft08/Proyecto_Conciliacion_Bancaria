// scripts/checkExpiredUsers.js
import { Usuario } from '../models/Usuario.js'; // Ruta corregida
import { Caducidad } from '../models/Caducidad.js'; // Ruta corregida
import { Op } from 'sequelize'; // Importar Op para usar operadores en consultas

export const checkExpiredUsers = async () => {
    const currentDate = new Date();

    try {
        const expiredCaducidades = await Caducidad.findAll({
            where: {
                fecha_expiracion: {
                    [Op.lte]: currentDate, // Fecha de expiración menor o igual a la fecha actual
                },
            },
            include: [Usuario], // Incluir el modelo Usuario para obtener los datos del usuario
        });

        for (const caducidad of expiredCaducidades) {
            await caducidad.Usuario.destroy(); // Eliminar el usuario asociado
            await caducidad.destroy(); // Eliminar la entrada de caducidad
        }

        console.log(`Se eliminaron ${expiredCaducidades.length} usuarios con rol de auditor expirados.`);
    } catch (error) {
        console.error('Error al verificar y eliminar usuarios expirados:', error);
    }
};

checkExpiredUsers();