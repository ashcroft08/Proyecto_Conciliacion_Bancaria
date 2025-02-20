import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Revision = sequelize.define('Revision', {
    cod_revision: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accion: {
        type: DataTypes.STRING, // Puede ser '✓', '✗'
        allowNull: false
    },
    valor: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'revision', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

// Función para insertar valores iniciales
Revision.afterSync(async () => {
    try {
        // Verificar si ya existen registros en la tabla
        const count = await Revision.count();
        if (count === 0) {
            // Insertar valores iniciales
            await Revision.bulkCreate([
                { accion: '✓', valor: true },
                { accion: '✗', valor: false }
            ]);
            console.log('Datos de Revision iniciales insertados correctamente.');
        } else {
            console.log('La tabla ya contiene registros. No se insertaron valores iniciales.');
        }
    } catch (error) {
        console.error('Error al insertar valores iniciales:', error);
    }
});