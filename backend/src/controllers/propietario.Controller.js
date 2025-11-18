import { Propietario } from "../models/Propietario.js";
import bcrypt from 'bcrypt';


export const createPropietario = async (req, res) => {
	try {
		const { nombre, apellido, usuario, email, password, telefono, role } = req.body;

		const hashed = await bcrypt.hash(password, 10);

		const newPropietario = await Propietario.create({
			nombre,
			apellido,
			usuario,
			email,
			password: hashed,
			telefono,
			role: role || 'propietario'
		});

		res.status(201).json({
			message: 'Propietario creado correctamente',
			propietario: newPropietario
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getPropietarios = async (req, res) => {
	try {
		const propietarios = await Propietario.findAll();
		res.send(propietarios);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

