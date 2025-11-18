import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Estudiante } from "./Estudiante.js";
import { Alojamiento } from "./Alojamiento.js";

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
            model: Estudiante, 
            key: 'id_estudiante'
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
    estatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});
