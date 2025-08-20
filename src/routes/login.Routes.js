import { Router } from "express";
import { login } from "../controllers/login.Controller.js";

const router = Router();

router.post('/login', login);

export default router;