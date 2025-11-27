import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Propietario.js',
  () => import('../mock/Propietario.js')
);

jest.unstable_mockModule(
  '../models/Alojamiento.js',
  () => import('../mock/Alojamiento.js')
);

jest.unstable_mockModule(
  '../models/Estudiante.js',
  () => import('../mock/Estudiante.js')
);

// mock bcrypt so imports expecting default or named exports work
jest.unstable_mockModule('bcrypt', () => ({
  default: { compare: jest.fn(), hash: jest.fn() },
  compare: jest.fn(),
  hash: jest.fn()
}));

let app;
let Estudiante, Propietario;
let loginHandler;
import request from 'supertest';

beforeAll(async () => {
  ({ Estudiante } = await import('../models/Estudiante.js'));
  ({ Propietario } = await import('../models/Propietario.js'));
  ({ login: loginHandler } = await import('../controllers/login.Controller.js'));

  // create a tiny app that mounts only the login route so we don't load the whole application
  const express = (await import('express')).default;
  const localApp = express();
  localApp.use(express.json());
  localApp.post('/login', loginHandler);
  app = localApp;
});

describe("Controlador Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /login", () => {
    it("debe encontrar un estudiante (200)", async () => {
        Estudiante.findOne.mockResolvedValue({ id_estudiante: 11, nombre: 'Juan', email: "juan@mail.com", password: "hashed" });
      Propietario.findOne.mockResolvedValue(null);
        const bcrypt = await import('bcrypt');
        if (bcrypt.default && bcrypt.default.compare) bcrypt.default.compare.mockResolvedValue(true);
        if (bcrypt.compare) bcrypt.compare.mockResolvedValue(true);
        // debug: show the compare functions we are using
        // debug info was here during development

      const res = await request(app)
        .post("/login")
        .send({ email: "juan@mail.com", password: "1234" });

      // debug: if this fails, print the response body to help diagnose
      // response logged during development previously — removed to keep tests clean
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Usuario autenticado');
      expect(res.body.user).toHaveProperty('id', 11);
    });

    it("debe encontrar un propietario (200)", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      Propietario.findOne.mockResolvedValue({ id_propietario: 6, nombre: 'Prop', email: "prop@mail.com", password: "hashed" });
      const bcrypt = await import('bcrypt');
      if (bcrypt.default && bcrypt.default.compare) bcrypt.default.compare.mockResolvedValue(true);
      if (bcrypt.compare) bcrypt.compare.mockResolvedValue(true);
      // debug info was here during development

      const res = await request(app)
        .post("/login")
        .send({ email: "prop@mail.com", password: "abcd" });

      // response logged during development previously — removed to keep tests clean
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Usuario autenticado');
      expect(res.body.user).toHaveProperty('id', 6);
    });

    it("debe manejar contraseña incorrecta (400)", async () => {
      Estudiante.findOne.mockResolvedValue({ email: "juan@mail.com", password: "hashed" });
      Propietario.findOne.mockResolvedValue(null);
      const bcrypt = await import('bcrypt');
      if (bcrypt.default && bcrypt.default.compare) bcrypt.default.compare.mockResolvedValue(false);
      if (bcrypt.compare) bcrypt.compare.mockResolvedValue(false);
      // debug info was here during development
      const res = await request(app)
        .post("/login")
        .send({ email: "juan@mail.com", password: "incorrecta" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Contraseña o email incorrecto!');
    });

    it("debe manejar usuario no encontrado (400)", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "noexiste@mail.com", password: "algo" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Usuario no encontrado!');
    });

    it("debe manejar errores internos (500)", async () => {
      Estudiante.findOne.mockRejectedValue(new Error("DB error"));
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "error@mail.com", password: "algo" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });
});