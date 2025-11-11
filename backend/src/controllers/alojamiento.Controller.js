import { Alojamiento } from "../models/Alojamiento.js";
import fs from 'fs';
import path from 'path';

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
    // Note: this route is expected to be called with multipart/form-data and multer middleware
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ message: 'No se envió id del alojamiento' });

    // find existing alojamiento to read current images
    const alojamientoPrev = await Alojamiento.findByPk(id);
    if (!alojamientoPrev) return res.status(404).json({ message: 'Alojamiento no encontrado' });

    const {
      titulo_anuncio, ubicacion, precio, tipo, no_habitacion, no_banios,
      superficie, descripcion, amenidades, servicios, estacionamiento, reglas
    } = req.body;

    // Update textual fields first
    await Alojamiento.update(
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
        reglas
      },
      { where: { id_alojamiento: id } }
    );

    // Handle images: req.files (new uploads) and req.body.existingImages (JSON list of filenames to keep)
    const existingImagesField = req.body.existingImages || '[]';
    let existingNames = [];
    try {
      existingNames = JSON.parse(existingImagesField);
      if (!Array.isArray(existingNames)) existingNames = [];
    } catch (err) {
      existingNames = String(existingImagesField).split(',').map(s => s.trim()).filter(Boolean);
    }

    // previous images stored in DB (comma separated)
    const prevImagesRaw = alojamientoPrev.imagen || '';
    const prevImages = prevImagesRaw ? String(prevImagesRaw).split(',').map(s => s.trim()).filter(Boolean) : [];

    // determine which files to delete (present before, not in existingNames)
    const toDelete = prevImages.filter(img => !existingNames.includes(img));

    // delete files from disk
    const uploadDir = path.join(process.cwd(), 'uploads');
    toDelete.forEach(fname => {
      const filePath = path.join(uploadDir, fname);
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('No se pudo borrar archivo:', filePath, err.message);
      }
    });

    // gather new uploaded file names
    let newFileNames = [];
    if (Array.isArray(req.files) && req.files.length) {
      newFileNames = req.files.map(f => f.filename);
    } else if (req.files && typeof req.files === 'object') {
      // in case of fields map
      Object.values(req.files).forEach(arr => {
        if (Array.isArray(arr)) newFileNames = newFileNames.concat(arr.map(f => f.filename));
      });
    }

    const finalImages = [...existingNames, ...newFileNames];

    // update imagen column with final list (comma separated)
    await Alojamiento.update({ imagen: finalImages.join(',') }, { where: { id_alojamiento: id } });

    const alojamientoActualizado = await Alojamiento.findByPk(id);
    return res.status(200).json({ message: 'Alojamiento editado correctamente!!', alojamientoActualizado });

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



