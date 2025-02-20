import { Usuario } from './models/Usuario.js';
import { Rol } from './models/Rol.js';
import { Transaccion } from './models/Transaccion.js';
import { Conciliacion } from "./models/Conciliacion.js";
import { Banco } from './models/Banco.js';
import { Revision } from './models/Revision.js';
import { Estado } from "./models/Estado.js";
import { ConfiguracionToken } from './models/ConfiguracionToken.js';
import { RecoverPassword } from './models/RecoverPassword.js';
import { RevisionAutomatizada } from './models/RevisionAutomatizada.js';

// Importa todos los modelos necesarios...

export const setupAssociations = () => {
    // Relación Usuario-Rol
    Usuario.belongsTo(Rol, { foreignKey: 'cod_rol' });
    Rol.hasMany(Usuario, { foreignKey: 'cod_rol' });

    // Define aquí todas las demás relaciones
    Transaccion.hasMany(Conciliacion, { foreignKey: 'cod_transaccion' });
    Conciliacion.belongsTo(Transaccion, { foreignKey: 'cod_transaccion' });

    Banco.hasMany(Conciliacion, { foreignKey: 'cod_transaccion_banco' });
    Conciliacion.belongsTo(Banco, { foreignKey: 'cod_transaccion_banco' });

    Revision.hasMany(Conciliacion, { foreignKey: 'cod_revision' });
    Conciliacion.belongsTo(Revision, { foreignKey: 'cod_revision' });

    RevisionAutomatizada.hasMany(Conciliacion, { foreignKey: 'cod_revision_automatizada' });
    Conciliacion.belongsTo(RevisionAutomatizada, { foreignKey: 'cod_revision_automatizada' });

    Estado.hasMany(Conciliacion, { foreignKey: 'cod_estado' });
    Conciliacion.belongsTo(Estado, { foreignKey: 'cod_estado' });

    Usuario.hasMany(RecoverPassword, { foreignKey: 'cod_usuario' });
    RecoverPassword.belongsTo(Usuario, { foreignKey: 'cod_usuario' });
};