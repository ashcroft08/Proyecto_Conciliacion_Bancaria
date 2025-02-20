import app from './app.js';
import { sequelize } from './database/database.js';
import { setupAssociations } from './associations.js';

// Importa todos los modelos

async function main() {
    try {
        // Establece relaciones después de importar modelos
        setupAssociations();
        await sequelize.sync({ force: true });
        console.log("Base de datos sincronizada correctamente..");
        app.listen(4000);
        console.log("Server is listening on port", 4000);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();