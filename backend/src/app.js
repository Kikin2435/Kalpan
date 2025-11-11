import express from 'express';
import path from 'path';
import cors from 'cors';
import estudianterouter from './routes/estudiante.Routes.js';
import alojamientorouter from './routes/alojamiento.Routes.js';
import login from './routes/login.Routes.js';
import propietariorouter from './routes/propietario.Routes.js';
import registerRouter from './routes/register.Routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('src/uploads')));
app.use(estudianterouter);
app.use(alojamientorouter);
app.use(login);
app.use(propietariorouter);
app.use(registerRouter);

export default app;