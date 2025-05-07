import { Estudiante } from "../models/Estudiante.js";
import { json } from "sequelize";
import bcrypt from 'bcrypt';
import { Propietario } from "../models/Propietario.js";

export const login = async (req, res) => {
    try {
        const { usuario, password  } = req.body;
        const estudiante = await Estudiante.findOne({ where: { usuario } });
        const propietario = await Propietario.findOne({where: { usuario }});
        
        const user = estudiante || propietario;

        if (!user) {
            return res.status(400).json({message: "Usuario no encontrado!"});
        } 

        //const passwrod = await bcrypt.compare(password, usuario.password);
        res.status(200).json({message: "Usuario encontrado!!!"});
        console.log(user);
    } catch (error) {
        return res.status(500).json({message: "Error interno con el servidor!"}, error);
    }
}