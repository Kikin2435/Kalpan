import bcrypt from 'bcrypt';
import { Estudiante } from '../models/Estudiante.js';
import { Propietario } from '../models/Propietario.js';

export const register = async (req, res) => {
  try {
    const { nombre, apellido, usuario, email, password, telefono, role } = req.body;

    if (!role || (role !== 'estudiante' && role !== 'propietario')) {
      return res.status(400).json({ message: 'Role inválido. Debe ser "estudiante" o "propietario".' });
    }

    const hashed = await bcrypt.hash(password, 10);

    if (role === 'estudiante') {
      const newEstudiante = await Estudiante.create({
        nombre,
        apellido,
        usuario,
        email,
        password: hashed,
        telefono,
        role: 'estudiante'
      });
      return res.status(201).json({ message: 'Estudiante creado correctamente', user: { id: newEstudiante.id_estudiante, role: 'estudiante' } });
    }

    const newPropietario = await Propietario.create({
      nombre,
      apellido,
      usuario,
      email,
      password: hashed,
      telefono,
      role: 'propietario'
    });

    return res.status(201).json({ message: 'Propietario creado correctamente', user: { id: newPropietario.id_propietario, role: 'propietario' } });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: error.message });
  }
};
