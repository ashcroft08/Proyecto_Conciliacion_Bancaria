import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const ConfiguracionToken = sequelize.define('ConfiguracionToken', {
    cod_token: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    expiresIn: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'configuracion_token', // Nombre de la tabla en la base de datos
    timestamps: true, // Desactiva los timestamps automáticos de Sequelize
});

// Hook para insertar un valor inicial después de sincronizar el modelo
ConfiguracionToken.afterSync(async () => {
    try {
        // Verificar si ya existe un registro en la tabla
        const count = await ConfiguracionToken.count();
        if (count === 0) {
            // Insertar un valor inicial
            await ConfiguracionToken.create({ expiresIn: '2h' });
            console.log('Valor inicial insertado en configuracion_token');
        }
    } catch (error) {
        console.error('Error al insertar el valor inicial:', error);
    }
});