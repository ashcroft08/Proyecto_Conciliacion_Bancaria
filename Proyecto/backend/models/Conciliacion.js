import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Conciliacion = sequelize.define('Conciliacion', {
    cod_comparacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cod_transaccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'transaccion', // Hace referencia directamente al modelo Rol
            key: 'cod_transaccion', // Clave referenciada
        },
    },
    cod_banco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'banco', // Hace referencia directamente al modelo Rol
            key: 'cod_banco', // Clave referenciada
        },
    },
    cod_revision: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'revision', // Hace referencia directamente al modelo Rol
            key: 'cod_revision', // Clave referenciada
        },
    },
    cod_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estado', // Hace referencia directamente al modelo Rol
            key: 'cod_estado', // Clave referenciada
        },
    }
}, {
    tableName: 'conciliacion', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});