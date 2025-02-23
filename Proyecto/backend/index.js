import app from './app.js';
import { sequelize } from './database/database.js';
import { setupAssociations } from './associations.js';
import cron from 'node-cron';
import { checkExpiredUsers } from './scripts/checkExpiredUsers.js';

async function main() {
    try {
        // Establece relaciones después de importar modelos
        setupAssociations();
        await sequelize.sync({ force: false });
        console.log("Base de datos sincronizada correctamente..");
        // Configurar el cron job para ejecutar la verificación de usuarios expirados
        cron.schedule('0 0 * * *', () => {
            console.log('Verificando usuarios expirados...');
            checkExpiredUsers();
        });
        app.listen(4000);
        console.log("Server is listening on port", 4000);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();