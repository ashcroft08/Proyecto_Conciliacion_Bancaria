import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Banco = sequelize.define('Banco', {
    cod_transaccion_banco: {
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
    tableName: 'banco', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});