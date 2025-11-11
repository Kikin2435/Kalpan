import bcrypt from 'bcrypt';
import { sequelize } from '../database/database.js';
import { Propietario } from '../models/Propietario.js';
import { Alojamiento } from '../models/Alojamiento.js';
import { Estudiante } from '../models/Estudiante.js';

async function seed() {
  try {
    await sequelize.sync({ force: false });
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);

    const prop1 = await Propietario.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      usuario: 'juanp',
      email: 'juan.perez@example.com',
      password: hash,
      telefono: '3001112222'
    });

    const prop2 = await Propietario.create({
      nombre: 'Ana',
      apellido: 'García',
      usuario: 'anag',
      email: 'ana.garcia@example.com',
      password: hash,
      telefono: '3003334444'
    });

    await Alojamiento.create({
      titulo_anuncio: 'Departamento céntrico',
      ubicacion: 'Centro',
      precio: 1200,
      tipo: 'Departamento',
      no_habitacion: '2',
      no_banios: '1',
      superficie: 55,
      descripcion: 'Departamento cómodo y luminoso, cerca de todo.',
      amenidades: 'WiFi,TV,Calefacción',
      servicios: 'Limpieza semanal',
      estacionamiento: 'No',
      reglas: 'No fumar',
      id_propietario: prop1.id_propietario
    });

    await Alojamiento.create({
      titulo_anuncio: 'Habitación en casa compartida',
      ubicacion: 'Barrio Norte',
      precio: 450,
      tipo: 'Habitación',
      no_habitacion: '1',
      no_banios: '1',
      superficie: 12,
      descripcion: 'Habitación amoblada en casa con jardín.',
      amenidades: 'WiFi',
      servicios: 'Agua, Luz',
      estacionamiento: 'No',
      reglas: 'No fiestas',
      id_propietario: prop2.id_propietario
    });

    await Estudiante.create({
      nombre: 'María',
      apellido: 'Gómez',
      usuario: 'mariag',
      email: 'maria.gomez@example.com',
      password: hash,
      telefono: '3005556666'
    });

    console.log('Seed data created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
