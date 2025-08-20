import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Estudiante.js',
  () => ({
    Estudiante: {
      create: jest.fn(),
      findAll: jest.fn()
    }
  })
);

let app;
let Estudiante;
import request from 'supertest';

beforeAll(async () => {
  ({ Estudiante } = await import('../models/Estudiante.js'));
  ({ default: app } = await import('../app.js'));
});

describe("Controlador Estudiante", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /crearEstudiante", () => {
    it("debe crear un estudiante correctamente (201)", async () => {
      const estudianteBody = {
        nombre: "Juan",
        apellido: "Pérez",
        usuario: "juanp",
        email: "juan@mail.com",
        password: "1234",
        telefono: "55555555"
      };
      const mockCreated = { id: 1, ...estudianteBody };
      Estudiante.create.mockResolvedValue(mockCreated);

      const res = await request(app)
        .post("/crearEstudiante")
        .send(estudianteBody);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("estudiante");
      expect(Estudiante.create).toHaveBeenCalledWith(estudianteBody);
    });

    it("debe manejar errores si la creación falla (500)", async () => {
      Estudiante.create.mockRejectedValue(new Error("Error al insertar"));

      const res = await request(app)
        .post("/crearEstudiante")
        .send({});

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("GET /estudiantes", () => {
    it("debe retornar todos los estudiantes (200)", async () => {
      const mockData = [
        { id: 1, nombre: "Juan", apellido: "Pérez" },
        { id: 2, nombre: "Ana", apellido: "López" }
      ];
      Estudiante.findAll.mockResolvedValue(mockData);

      const res = await request(app).get("/estudiantes");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(Estudiante.findAll).toHaveBeenCalledTimes(1);
    });

    it("debe manejar errores correctamente (500)", async () => {
      Estudiante.findAll.mockRejectedValue(new Error("Error de base de datos"));

      const res = await request(app).get("/estudiantes");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });
  });
});