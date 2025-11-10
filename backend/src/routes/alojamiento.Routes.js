import { Router } from "express";
import { crearAlojamiento, delAlojamiento, editarAlojamiento, getAlojamientos } from "../controllers/alojamiento.Controller.js";
// import { upload } from "../routes/uploads.Routes.js";

const router = Router();

// router.post('/crearAlojamiento', upload.single('imagen'), crearAlojamiento);
router.put('/editAlojamiento', editarAlojamiento);
router.delete('/delAlojamiento', delAlojamiento);
router.get('/alojamientos', getAlojamientos);

export default router;