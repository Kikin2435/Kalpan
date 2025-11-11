import { Router } from "express";
import { createPropietario, getPropietarios } from "../controllers/propietario.Controller.js";

const router = Router();

router.post('/crearPropietario', createPropietario);
router.get('/propietarios', getPropietarios);

export default router;
