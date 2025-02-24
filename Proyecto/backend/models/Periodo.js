import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Periodo = sequelize.define('Periodo', {
    cod_periodo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cod_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estado', // Hace referencia directamente al modelo Rol
            key: 'cod_estado', // Clave referenciada
        },
    },
    nombre_periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'periodo', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});