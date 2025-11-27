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
      // controller returns the created alojamiento under 'alojamiento'
      expect(res.body).toHaveProperty('alojamiento');
      expect(Alojamiento.create).toHaveBeenCalledWith(expect.objectContaining({ titulo_anuncio: alojamientoBody.titulo_anuncio }));
    });

    it("debe manejar errores si la creación falla (500)", async () => {
      Alojamiento.create.mockRejectedValue(new Error("Error al insertar"));

      const res = await request(app)
        .post("/crearAlojamiento")
        .send({});

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });

    it('debe retornar 400 cuando se intenta eliminar sin id', async () => {
      const res = await request(app).delete('/delAlojamiento').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('debe retornar 404 cuando no existe id a eliminar', async () => {
      Alojamiento.destroy.mockResolvedValue(0);
      const res = await request(app).delete('/delAlojamiento').send({ id: 999 });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
    });

    it('edicion retorna 404 cuando no se actualiza nada', async () => {
      Alojamiento.update.mockResolvedValue([0]);
      const res = await request(app).put('/editAlojamiento').send({ id: 888 });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message');
    });

    it('edicion retorna 200 cuando actualiza correctamente', async () => {
      Alojamiento.update.mockResolvedValue([1]);
      Alojamiento.findByPk.mockResolvedValue({ id_alojamiento: 10, titulo_anuncio: 'OK' });
      const res = await request(app).put('/editAlojamiento').send({ id: 10, titulo_anuncio: 'OK' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('alojamientoActualizado');
    });
  });
});