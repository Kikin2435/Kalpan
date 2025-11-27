import { jest } from '@jest/globals';

let uploads;

beforeAll(async () => {
  ({ uploads } = await import('../middlewares/uploads.js'));
});

describe('Uploads middleware', () => {
  it('debe exportar un middleware de multer con métodos', () => {
    expect(uploads).toBeDefined();
    // multer instances are functions and have helpers like .single
    expect(typeof uploads.single === 'function' || typeof uploads === 'function').toBeTruthy();
  });
});
