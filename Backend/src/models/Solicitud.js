import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Solicitud = sequelize.define('solicitud', {
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Propietario, 
            key: 'id_propietario'
        }
    },
    id_alojamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alojamiento, 
            key: 'id_alojamiento'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});
