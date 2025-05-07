import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Propietario } from "./Propietario.js";

export const Alojamiento = sequelize.define('alojamiento', {
    id_alojamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    titulo_anuncio: {
        type: DataTypes.STRING
    },
    ubicacion: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        // allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        // allowNull: false,
    },
    no_habitacion : {
        type: DataTypes.STRING
    },  
    no_banios: {
        type: DataTypes.STRING
    },
    superficie: {
        type: DataTypes.INTEGER
    },
    descripcion: {
        type: DataTypes.TEXT,
        // allowNull: false
    },
    amenidades: {
        type: DataTypes.STRING
    },
    servicios: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    estacionamiento: {
        type: DataTypes.STRING
    },
    reglas: {
        type: DataTypes.TEXT
    },
    id_propietario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Propietario, 
            key: 'id_propietario'
        }
    }
}, {
    timestamps: true
});


Propietario.hasMany(Alojamiento, {
    foreignKey: 'id_propietario'
});

Alojamiento.belongsTo(Propietario, {
    foreignKey: 'id_propietario'
});
