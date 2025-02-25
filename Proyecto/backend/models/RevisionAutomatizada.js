import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const RevisionAutomatizada = sequelize.define('RevisionAutomatizada', {
    cod_revision_automatizada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    coincide: { // Cambiado a un nombre más descriptivo
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: 'Indica si la transacción coincide con el banco (true/false)',
    },
}, {
    tableName: 'revision_automatizada', // Nombre explícito de la tabla
    timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

// Función para insertar valores iniciales
RevisionAutomatizada.afterSync(async () => {
    try {
        // Verificar si ya existen registros en la tabla
        const count = await RevisionAutomatizada.count();
        if (count === 0) {
            // Insertar valores iniciales
            await RevisionAutomatizada.bulkCreate([
                { coincide: true },
                { coincide: false }
            ]);
            console.log('Datos de Revision Automatizada iniciales insertados correctamente.');
        } else {
            console.log('La tabla Revision Automatizada ya contiene registros. No se insertaron valores iniciales.');
        }
    } catch (error) {
        console.error('Error al insertar valores iniciales:', error);
    }
});