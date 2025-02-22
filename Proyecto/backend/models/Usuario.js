import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Rol } from './Rol.js'; // Importar Rol antes de las relaciones
import bcrypt from 'bcrypt';

export const Usuario = sequelize.define('Usuario', {
    cod_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rol', // Hace referencia directamente al modelo Rol
            key: 'cod_rol', // Clave referenciada
        },
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Inicialmente 0 intentos
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Inicialmente no bloqueado
    },
    lock_time: {
        type: DataTypes.DATE,
        allowNull: true, // Puede ser nulo si no está bloqueado
    },
}, {
    tableName: 'usuario', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

// Hook para crear un administrador inicial (si no existe)
Usuario.afterSync(async () => {
    const superRol = await Rol.findOne({ where: { nombre_rol: 'Superusuario' } });
    if (superRol) {
        // Verificar si ya existe un usuario con el rol de administrador
        const existingUser = await Usuario.findOne({ where: { cod_rol: superRol.cod_rol } });

        if (!existingUser) {
            // Si no existe, crear el Administrador
            const usuario = await Usuario.create({
                cod_rol: superRol.cod_rol,
                nombres: 'Administrador',
                apellidos: 'Sistema',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('Admin08_*', 10), // Encriptar la contraseña
            });

            console.log('Administrador insertado exitosamente');
        } else {
            console.log('Administrador ya existe. No se realizaron cambios.');
        }
    } else {
        console.error('Rol Administrador no encontrado.');
    }
});