import { sequelize } from '../database/database.js';
import { Propietario } from './Propietario.js';
import { Alojamiento } from './Alojamiento.js';

Propietario.hasMany(Alojamiento, { foreignKey: 'id_propietario' });
Alojamiento.belongsTo(Propietario, { foreignKey: 'id_propietario' });

export const initDB = () => {
    sequelize.sync({ alter: false });
};

export { Propietario, Alojamiento };
