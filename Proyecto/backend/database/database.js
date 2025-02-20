import Sequelize from 'sequelize';

// Configuración para PostgreSQL
export const sequelize = new Sequelize('conciliacion', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', // Cambia el dialecto a 'postgres'
    port: 5432, // Puerto predeterminado de PostgreSQL
    logging: false, // Opcional: desactiva los logs de SQL
});

export default sequelize;