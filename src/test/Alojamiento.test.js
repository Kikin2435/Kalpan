import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Alojamiento.js',
  () => import('../mock/Alojamiento.js')
);

let app;
let Alojamiento;
import request from 'supertest';

beforeAll(async () => {
  ({ Alojamiento } = await import('../models/Alojamiento.js'));
  ({ default: app } = await import('../app.js'));
});

describe("Controlador Alojamiento", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /alojamientos", () => {
    it("debe retornar todos los alojamientos (200)", async () => {
      const mockData = [
        { id: 1, titulo_anuncio: "Casa en la playa", precio: 1500 },
        { id: 2, titulo_anuncio: "Departamento moderno", precio: 1200 }
      ];
      Alojamiento.findAll.mockResolvedValue(mockData);

      const res = await request(app).get("/alojamientos");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(Alojamiento.findAll).toHaveBeenCalledTimes(1);
    });

    it("debe manejar errores correctamente (500)", async () => {
      Alojamiento.findAll.mockRejectedValue(new Error("Error de base de datos"));

      const res = await request(app).get("/alojamientos");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("POST /crearAlojamiento", () => {
    it("debe crear un nuevo alojamiento correctamente (200)", async () => {
      const alojamientoBody = {
        titulo_anuncio: "Casa nueva",
        ubicacion: "CDMX",
        precio: 1000,
        tipo: "Casa",
        no_habitacion: "2",
        no_banios: "1",
        superficie: 80,
        descripcion: "Bonita casa",
        amenidades: "WiFi",
        servicios: "Limpieza",
        estacionamiento: "1",
        reglas: "No mascotas"
      };
      const mockCreated = { id: 3, ...alojamientoBody, imagen: null };
      Alojamiento.create.mockResolvedValue(mockCreated);

      const res = await request(app)
        .post("/crearAlojamiento")
        .send(alojamientoBody);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("newAlojamiento");
      expect(Alojamiento.create).toHaveBeenCalledWith(alojamientoBody);
    });

    it("debe manejar errores si la creación falla (500)", async () => {
      Alojamiento.create.mockRejectedValue(new Error("Error al insertar"));

      const res = await request(app)
        .post("/crearAlojamiento")
        .send({});

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });
  });
});