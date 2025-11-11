import { Alojamiento } from "../models/Alojamiento.js";

export const crearAlojamiento = async (req, res) => {
  try {
    console.log('req.files =>', req.files); // debug: verificar qué llega
    const {
      titulo_anuncio,
      ubicacion,
      precio,
      tipo,
      no_habitacion,
      no_banios,
      superficie,
      descripcion,
      amenidades,
      servicios,
      estacionamiento,
      reglas
    } = req.body;

    // Normalizar req.files cuando usamos upload.array | upload.fields
    let filesArray = [];

    if (Array.isArray(req.files)) {
      filesArray = req.files;
    } else if (req.files && typeof req.files === "object") {
      // req.files puede ser { imagen: [..], imagenes: [..] }
      Object.values(req.files).forEach(arr => {
        if (Array.isArray(arr)) filesArray = filesArray.concat(arr);
      });
    }

    const imagenes = filesArray.length ? filesArray.map(file => file.filename) : [];

    const newAlojamiento = await Alojamiento.create({
      titulo_anuncio,
      ubicacion,
      precio,
      tipo,
      no_habitacion,
      no_banios,
      superficie,
      descripcion,
      amenidades,
      servicios,
      estacionamiento,
      reglas,
      imagen: imagenes.join(','), // guarda nombres separados por coma
    });

    res.status(200).json({
      message: 'Alojamiento creado correctamente',
      alojamiento: newAlojamiento,
    });
  } catch (error) {
    console.error('Error al crear alojamiento:', error);
    res.status(500).json({ message: error.message });
  }
};


export const editarAlojamiento = async (req, res) => {
  try {
    const { id } = req.body;
    const {
      titulo_anuncio, ubicacion, precio, tipo, no_habitacion, no_banios,
      superficie, descripcion, amenidades, servicios, estacionamiento, reglas, status
    } = req.body;

    const [updated] = await Alojamiento.update(
      {
        titulo_anuncio,
        ubicacion,
        precio,
        tipo,
        no_habitacion,
        no_banios,
        superficie,
        descripcion,
        amenidades: Array.isArray(amenidades) ? amenidades.join(', ') : amenidades,
        servicios: Array.isArray(servicios) ? servicios.join(', ') : servicios,
        estacionamiento,
        reglas,
        status
      },
      { where: { id_alojamiento: id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Alojamiento no encontrado" });
    }

    const alojamientoActualizado = await Alojamiento.findByPk(id);
    return res.status(200).json({
      message: "Alojamiento editado correctamente!!",
      alojamientoActualizado
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAlojamientos = async (req, res) => {
  try {
    const alojamientos = await Alojamiento.findAll({
      where: {
        status: 1,
      }
    });
    res.status(200).json(alojamientos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alojamientos" });
  }
};

export const delAlojamiento = async (req, res) => {
  try {
    const { id } = req.body;

    console.log(req);

    if (!id) {
      return res.status(400).json({ message: "No se envió id del alojamiento" });
    }

    const deleted = await Alojamiento.destroy({
      where: { id_alojamiento: parseInt(id) }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Alojamiento no encontrado" });
    }

    return res.status(200).json({ message: "Alojamiento eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el alojamiento", error: error.message });
  }
};



