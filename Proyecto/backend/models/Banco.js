import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Banco = sequelize.define('Banco', {
    cod_transaccion_banco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cod_periodo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'periodo', // Hace referencia directamente al modelo Rol
            key: 'cod_periodo', // Clave referenciada
        },
    },
    nro_cuenta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    debe: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    haber: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    saldo: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'banco', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});