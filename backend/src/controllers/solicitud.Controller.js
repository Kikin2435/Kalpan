import { Solicitud } from "../models/Solicitud.js ";

export const createSolicitud = async (req, res) => {
    try {
        const {id_estudiante, id_alojamiento, fecha} = req.body;

        const newSolicitud = await Solicitud.create({
            id_estudiante, id_alojamiento, fecha
        });
        console.log(newSolicitud);
        res.status(201).json({
            message: "Solicitud creada correctamente!",
            solicitud: newSolicitud
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitud.findAll(); 
        res.send(solicitudes);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }  
}