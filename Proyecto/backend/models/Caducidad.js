import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario.js';

export const Caducidad = sequelize.define('Caducidad', {
    cod_caducidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,  // Conexión con el modelo Usuario
            key: 'cod_usuario',  // Clave primaria de Usuario
        },
    },
    fecha_expiracion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'caducidad',  // Nombre de la tabla de recuperación de contraseñas
});