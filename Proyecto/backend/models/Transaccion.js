import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Transaccion = sequelize.define('Transaccion', {
    cod_transaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nro_cuenta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    saldos: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'transaccion', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});