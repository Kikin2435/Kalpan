import { Router } from "express";
import { createEstudiante, getEstudiantes } from "../controllers/estudiante.Controller.js";

const router = Router();

router.post('/crearEstudiante', createEstudiante);
router.get('/estudiantes', getEstudiantes);

export default router;