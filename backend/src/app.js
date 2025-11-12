import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import estudianterouter from './routes/estudiante.Routes.js';
import alojamientorouter from './routes/alojamiento.Routes.js';
import login from './routes/login.Routes.js';
import propietariorouter from './routes/propietario.Routes.js';
import registerRouter from './routes/register.Routes.js';
import router from './routes/uploads.Routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(estudianterouter);
app.use(alojamientorouter);
app.use(login);
app.use(propietariorouter);
app.use(registerRouter);
app.use(router);

export default app;