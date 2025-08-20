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

let app;
let Estudiante, Propietario;
import request from 'supertest';

beforeAll(async () => {
  ({ Estudiante } = await import('../models/Estudiante.js'));
  ({ Propietario } = await import('../models/Propietario.js'));
  ({ default: app } = await import('../app.js'));
});

describe("Controlador Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /login", () => {
    it("debe encontrar un estudiante (200)", async () => {
      Estudiante.findOne.mockResolvedValue({ email: "juan@mail.com", password: "1234" });
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "juan@mail.com", password: "1234" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Usuario encontrado!!!");
    });

    it("debe encontrar un propietario (200)", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      Propietario.findOne.mockResolvedValue({ email: "prop@mail.com", password: "abcd" });

      const res = await request(app)
        .post("/login")
        .send({ email: "prop@mail.com", password: "abcd" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Usuario encontrado!!!");
    });

    it("debe manejar contraseña incorrecta (400)", async () => {
      Estudiante.findOne.mockResolvedValue({ email: "juan@mail.com", password: "1234" });
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "juan@mail.com", password: "incorrecta" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Contraseña o email incorrecto!");
    });

    it("debe manejar usuario no encontrado (400)", async () => {
      Estudiante.findOne.mockResolvedValue(null);
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "noexiste@mail.com", password: "algo" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Usuario no encontrado!");
    });

    it("debe manejar errores internos (500)", async () => {
      Estudiante.findOne.mockRejectedValue(new Error("DB error"));
      Propietario.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "error@mail.com", password: "algo" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });
  });
});