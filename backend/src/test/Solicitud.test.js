import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Solicitud.js',
  () => import('../mock/Solicitud.js')
);

let app;
let Solicitud;
import request from 'supertest';

beforeAll(async () => {
  ({ Solicitud } = await import('../models/Solicitud.js'));
  ({ default: app } = await import('../app.js'));
});

describe('Controlador Solicitud', () => {
  beforeEach(() => jest.clearAllMocks());

  it('crea solicitud correctamente (201)', async () => {
    const body = { id_estudiante: 1, id_alojamiento: 1, fecha: '2024-01-01' };
    Solicitud.create.mockResolvedValue({ id_solicitud: 7, ...body });

    const res = await request(app).post('/crearSolicitud').send(body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('solicitud');
    expect(Solicitud.create).toHaveBeenCalledWith(expect.objectContaining({ id_estudiante: 1 }));
  });

  it('devuelve lista de solicitudes (200)', async () => {
    const mockList = [{ id_solicitud: 7, id_estudiante: 1 }];
    Solicitud.findAll.mockResolvedValue(mockList);

    const res = await request(app).get('/solicitudes');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockList);
  });

  it('maneja error en create (500)', async () => {
    Solicitud.create.mockRejectedValue(new Error('err'));

    const res = await request(app).post('/crearSolicitud').send({});

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });
});
