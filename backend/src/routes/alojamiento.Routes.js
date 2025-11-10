import { Router } from "express";
import { crearAlojamiento, delAlojamiento, editarAlojamiento, getAlojamientos } from "../controllers/alojamiento.Controller.js";
import { uploads } from "../middlewares/uploads.js";

const router = Router();

router.post('/crearAlojamiento', uploads.array('imagen'), crearAlojamiento);
router.put('/editAlojamiento', editarAlojamiento);
router.delete('/delAlojamiento', delAlojamiento);
router.get('/alojamientos', getAlojamientos);

export default router;