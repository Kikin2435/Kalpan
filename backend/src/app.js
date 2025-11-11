import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import estudianterouter from './routes/estudiante.Routes.js';
import alojamientorouter from './routes/alojamiento.Routes.js';
import uploadrouter from './routes/uploads.Routes.js';
import login from './routes/login.Routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Serve uploaded files from the same uploads directory where multer stores them.
// multer uses process.cwd() + '/uploads' in the uploads middleware, so use the same path here.
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(estudianterouter);
app.use(alojamientorouter);
app.use(login);
app.use(uploadrouter);

export default app;