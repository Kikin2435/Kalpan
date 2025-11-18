import { Solicitud } from "../models/Solicitud.js ";

export const createSolicitud = async (req, res) => {
    try {
        const {id_estudiante, id_alojamiento, estatus, fecha} = req.body;
        const existingSolicitud = await Solicitud.findOne({
            where: { id_estudiante, id_alojamiento }
        });

        if (existingSolicitud) {
            if (existingSolicitud.estatus === 'pendiente' || existingSolicitud.estatus === 'aprobada') {
                return res.status(400).json({ message: "Ya existe una solicitud para este alojamiento por parte de este estudiante." });
            }
        }

        const newSolicitud = await Solicitud.create({
            id_estudiante, id_alojamiento, estatus, fecha
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