import { jest } from '@jest/globals';

jest.unstable_mockModule(
  '../models/Estudiante.js',
  () => import('../mock/Estudiante.js')
);

jest.unstable_mockModule(
  '../models/Propietario.js',
  () => import('../mock/Propietario.js')
);

// mock Alojamiento as well to avoid model association issues during import
jest.unstable_mockModule(
  '../models/Alojamiento.js',
  () => import('../mock/Alojamiento.js')
);

// bcrypt is used by register controller for hashing — mock it so tests don't perform real hashing
jest.unstable_mockModule('bcrypt', () => ({
  default: { hash: jest.fn() },
  hash: jest.fn()
}));

let app;
let Estudiante, Propietario;
import request from 'supertest';

beforeAll(async () => {
  ({ Estudiante } = await import('../models/Estudiante.js'));
  ({ Propietario } = await import('../models/Propietario.js'));
  ({ default: app } = await import('../app.js'));
});

describe('Controlador Register', () => {
  beforeEach(() => jest.clearAllMocks());

  it('rechaza role inválido (400)', async () => {
    const res = await request(app).post('/register').send({ role: 'invalid' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('crea estudiante correctamente (201)', async () => {
    Estudiante.create.mockResolvedValue({ id_estudiante: 5 });
    const bcrypt = await import('bcrypt');
    bcrypt.hash.mockResolvedValue('hashedpw');

    const res = await request(app).post('/register').send({ role: 'estudiante', nombre: 'X', apellido: 'Y', usuario: 'xy', email: 'e@mail.com', password: 'pw', telefono: '123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('crea propietario correctamente (201)', async () => {
    Propietario.create.mockResolvedValue({ id_propietario: 6 });
    const bcrypt = await import('bcrypt');
    bcrypt.hash.mockResolvedValue('hashedpw');

    const res = await request(app).post('/register').send({ role: 'propietario', nombre: 'Z', apellido: 'W', usuario: 'zw', email: 'p@mail.com', password: 'pw', telefono: '456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('maneja error interno (500)', async () => {
    Estudiante.create.mockRejectedValue(new Error('DBerr'));
    const bcrypt = await import('bcrypt');
    bcrypt.hash.mockResolvedValue('hashedpw');

    const res = await request(app).post('/register').send({ role: 'estudiante', nombre: 'fail' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });
});
