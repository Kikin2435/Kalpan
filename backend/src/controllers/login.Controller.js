import { Estudiante } from "../models/Estudiante.js";
import { Propietario } from "../models/Propietario.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const estudiante = await Estudiante.findOne({ where: { email } });
        const propietario = await Propietario.findOne({ where: { email } });


        const user = estudiante || propietario;

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado!" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Contraseña o email incorrecto!" });
        }

        // determine id and role depending on which model matched
        const userType = estudiante ? 'estudiante' : 'propietario';
        const userId = estudiante ? estudiante.id_estudiante : propietario.id_propietario;

        res.status(200).json({
            message: "Usuario autenticado",
            user: {
                id: userId,
                role: user.role || userType,
                nombre: user.nombre,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno con el servidor!" });
    }
};