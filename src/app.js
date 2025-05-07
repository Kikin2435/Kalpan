import express from 'express';
import path from 'path';
import cors from 'cors';
import loginrouter from './routes/login.Routes.js'
import estudianterouter from './routes/estudiante.Routes.js';
import alojamientorouter from './routes/alojamiento.Routes.js';
import { initDB } from './models/index.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('src/uploads')));
app.use(estudianterouter);
app.use(alojamientorouter);
app.use(loginrouter);

export default app;