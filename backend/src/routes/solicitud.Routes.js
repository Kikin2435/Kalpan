import { Router } from "express";
import { createSolicitud, getSolicitudes } from "../controllers/solicitud.Controller.js";

const router = Router();

router.post('/crearSolicitud', createSolicitud);
router.get('/solicitudes', getSolicitudes);

export default router;