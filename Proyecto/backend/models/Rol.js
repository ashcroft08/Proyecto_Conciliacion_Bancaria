import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Rol = sequelize.define('Rol', {
    cod_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_rol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'rol',
    timestamps: false,
});

// Hook para insertar roles iniciales
Rol.afterSync(async () => {
    const roles = ['Administrador', 'Gerente', 'Auditor', 'Jefe contable', 'Contador'];
    for (const nombre of roles) {
        await Rol.findOrCreate({ where: { nombre_rol: nombre } });
    }
});