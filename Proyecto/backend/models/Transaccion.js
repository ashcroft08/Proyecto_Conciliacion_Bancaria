import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Transaccion = sequelize.define('Transaccion', {
    cod_transaccion: {
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
    descripcion: {
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
    tableName: 'transaccion', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});