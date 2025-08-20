import { Estudiante } from "../models/Estudiante.js";
import { Propietario } from "../models/Propietario.js";

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const estudiante = await Estudiante.findOne({ where: { email } });
        const propietario = await Propietario.findOne({ where: { email } });


        const user = estudiante || propietario;

        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado!" });
        } 
        
        if(password !== user?.password) {
            return res.status(400).json({ message: "Contraseña o email incorrecto!" });
        }   

        // console.log(user);


        res.status(200).json({ message: "Usuario encontrado!!!" });
    } catch (error) {
        res.status(500).json({ message: "Error interno con el servidor!" });
    }
};