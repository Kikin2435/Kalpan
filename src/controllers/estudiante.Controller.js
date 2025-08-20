import { Estudiante } from "../models/Estudiante.js";



export const createEstudiante = async (req, res) => {
    try {
        const {nombre, apellido, usuario, email, password, telefono} = req.body;

        const newEstudiante = await Estudiante.create({
            nombre, apellido, usuario, email, password, telefono
        });
        console.log(newEstudiante);
        res.status(201).json({
            message: "Estudiante creado correctamente!",
            estudiante: newEstudiante
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.send(estudiantes);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}