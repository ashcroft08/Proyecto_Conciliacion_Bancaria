import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Estado = sequelize.define('Estado', {
    cod_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'estado', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

// Función para insertar valores iniciales
Estado.afterSync(async () => {
    try {
        // Verificar si ya existen registros en la tabla
        const count = await Estado.count();
        if (count === 0) {
            // Insertar valores iniciales
            await Estado.bulkCreate([
                { estado: 'Aprobado', valor: true },
                { estado: 'Reprobado', valor: false }
            ]);
            console.log('Datos de Estado iniciales insertados correctamente.');
        } else {
            console.log('La tabla ya contiene registros. No se insertaron valores iniciales.');
        }
    } catch (error) {
        console.error('Error al insertar valores iniciales:', error);
    }
});