import express from "express";
import { crearAlojamiento } from "../controllers/alojamiento.Controller.js";
import { uploads } from "../middlewares/uploads.js";

const router = express.Router();

// Utiliza el middleware de subidas compartidas para que todos los archivos se suban al mismo directorio.
// (El middleware usa process.cwd()/uploads). Esto mantiene la coherencia entre los flujos de publicación y edición, y garantiza que los archivos se sirvan mediante la ruta estática.
router.post("/crear", uploads.any(), crearAlojamiento);
export default router;