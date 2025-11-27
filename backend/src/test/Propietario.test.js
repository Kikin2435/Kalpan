import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Propietario.js',
  () => import('../mock/Propietario.js')
);

// mock Alojamiento as well (prevents running associations during imports)
jest.unstable_mockModule(
  '../models/Alojamiento.js',
  () => import('../mock/Alojamiento.js')
);

let app;
let Propietario;
import request from 'supertest';

beforeAll(async () => {
  ({ Propietario } = await import('../models/Propietario.js'));
  ({ default: app } = await import('../app.js'));
});

describe('Controlador Propietario', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('POST /crearPropietario', () => {
    it('crea un nuevo propietario correctamente (201)', async () => {
      const body = { nombre: 'Luis', apellido: 'Paz', usuario: 'luisp', email: 'luis@mail.com', password: '1234', telefono: '555' };
      const mockCreated = { id_propietario: 1, ...body };
      Propietario.create.mockResolvedValue(mockCreated);

      const res = await request(app).post('/crearPropietario').send(body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('propietario');
      expect(Propietario.create).toHaveBeenCalledWith(expect.objectContaining({ email: body.email }));
    });

    it('maneja errores si create falla (500)', async () => {
      Propietario.create.mockRejectedValue(new Error('DB error'));

      const res = await request(app).post('/crearPropietario').send({});

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /propietarios', () => {
    it('retorna lista de propietarios (200)', async () => {
      const mockList = [{ id_propietario: 1, nombre: 'A' }];
      Propietario.findAll.mockResolvedValue(mockList);

      const res = await request(app).get('/propietarios');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockList);
      expect(Propietario.findAll).toHaveBeenCalledTimes(1);
    });

    it('maneja errores en findAll (500)', async () => {
      Propietario.findAll.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/propietarios');

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('message');
    });
  });
});
