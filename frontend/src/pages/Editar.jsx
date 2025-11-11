import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './PublicarAlojamiento.module.css';
import FileUploader from '../components/FileUploader.jsx';

function Editar() {
    const location = useLocation();
    const alojamiento = location.state?.alojamiento;
    const navigate = useNavigate();

    // form fields
    const [titulo_anuncio, setTitulo_anuncio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [tipo, setTipo] = useState('');
    const [no_habitacion, setNo_Habitacion] = useState('');
    const [no_banios, setNo_Banios] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [amenidades, setAmenidades] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [estacionamiento, setEstacionamiento] = useState('');
    const [reglas, setReglas] = useState('');

    // images
    // existingImages: array of { name, url }
    const [existingImages, setExistingImages] = useState([]);
    // newFiles: File[] selected in this edit session (populated by FileUploader)
    const [newFiles, setNewFiles] = useState([]);

    useEffect(() => {
        if (!alojamiento) return;

        // populate basic fields (attempt multiple property names)
        setTitulo_anuncio(alojamiento.titulo_anuncio || alojamiento.title || alojamiento.titulo || '');
        setDescripcion(alojamiento.descripcion || alojamiento.desc || alojamiento.descripcion_corta || '');
        setPrecio(alojamiento.precio || alojamiento.price || '');
        setUbicacion(alojamiento.ubicacion || alojamiento.location || '');
        setTipo(alojamiento.tipo || '');
        setNo_Habitacion(alojamiento.no_habitacion || alojamiento.habitaciones || alojamiento.rooms || '');
        setNo_Banios(alojamiento.no_banios || alojamiento.banos || alojamiento.bathrooms || '');
        setSuperficie(alojamiento.superficie || alojamiento.area || '');

        setAmenidades(
            Array.isArray(alojamiento.amenidades)
                ? alojamiento.amenidades
                : (alojamiento.amenidades ? String(alojamiento.amenidades).split(',').map(a => a.trim()) : [])
        );

        setServicios(
            Array.isArray(alojamiento.servicios)
                ? alojamiento.servicios
                : (alojamiento.servicios ? String(alojamiento.servicios).split(',').map(a => a.trim()) : [])
        );

        setEstacionamiento(alojamiento.estacionamiento || '');
        setReglas(alojamiento.reglas || '');

        // Parse existing images. Accept multiple possible field names and formats.
        const imgField = alojamiento.imagen || alojamiento.imagenes || alojamiento.images || alojamiento.imagenes_lista || '';
        let imgList = [];
        if (Array.isArray(imgField)) {
            imgList = imgField;
        } else if (typeof imgField === 'string' && imgField.trim() !== '') {
            // can be comma separated or JSON
            try {
                const parsed = JSON.parse(imgField);
                if (Array.isArray(parsed)) imgList = parsed;
                else imgList = [String(parsed)];
            } catch (err) {
                // fallback split by comma
                imgList = imgField.split(',').map(s => s.trim()).filter(Boolean);
            }
        }

        const mapped = imgList.map((name) => {
            // some entries may already be full URLs; we want to store only the filename in 'name'
            const raw = String(name).trim();
            let filename = raw;
            let url = raw;
            if (raw.startsWith('http')) {
                try {
                    const parsed = new URL(raw);
                    const parts = parsed.pathname.split('/').filter(Boolean);
                    filename = parts.length ? decodeURIComponent(parts[parts.length - 1]) : raw;
                    url = raw;
                } catch (err) {
                    // fallback
                    filename = raw;
                    url = raw;
                }
            } else {
                url = `http://localhost:4000/uploads/${encodeURIComponent(raw)}`;
            }
            return { name: filename, url };
        });

        setExistingImages(mapped);

    }, [alojamiento]);

    if (!alojamiento) {
        return (
            <div className={styles['centrar-pagina']}>
                <p>No hay alojamiento seleccionado para editar.</p>
            </div>
        );
    }

    const handleAmenidadesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) setAmenidades(prev => [...prev, value]);
        else setAmenidades(prev => prev.filter((item) => item !== value));
    };

    const handleServiciosChange = (e) => {
        const { value, checked } = e.target;
        if (checked) setServicios(prev => [...prev, value]);
        else setServicios(prev => prev.filter((item) => item !== value));
    };

    // remove an existing image (mark for deletion)
    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    // newFiles will be set via <FileUploader onChange={setNewFiles} />

    const handleRegresar = () => navigate('/menu');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = alojamiento.id || alojamiento.id_alojamiento || alojamiento.ID || null;
        if (!id) {
            alert('ID de alojamiento no disponible');
            return;
        }

        // Build FormData: include normal fields, existingImages (names to keep), and new files
        const formData = new FormData();
        formData.append('id', id);
        formData.append('titulo_anuncio', titulo_anuncio);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('ubicacion', ubicacion);
        formData.append('tipo', tipo);
        formData.append('no_habitacion', no_habitacion);
        formData.append('no_banios', no_banios);
        formData.append('superficie', superficie);
        formData.append('amenidades', amenidades.join(', '));
        formData.append('servicios', servicios.join(', '));
        formData.append('estacionamiento', estacionamiento);
        formData.append('reglas', reglas);

        // existing images names (keep)
        const existingNames = existingImages.map(i => i.name);
        formData.append('existingImages', JSON.stringify(existingNames));

        // append new files under key 'imagen' (backend should accept multiple)
        newFiles.forEach((file) => {
            formData.append('imagen', file, file.name);
        });

        try {
            const res = await fetch('http://localhost:4000/editAlojamiento', {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Error en el servidor');
            }

            const data = await res.json();
            console.log('Editado:', data);
            navigate('/menu');
        } catch (err) {
            console.error('Fallo al editar alojamiento', err);
            alert('Error al editar alojamiento: ' + (err.message || err));
        }
    };

    return (
        <div className={styles['centrar-pagina']}>
            <nav className={styles.nav}>
                <div className={styles.Logo}></div>
            </nav>
            <div className={styles.container}>
                <h2>Editar Alojamiento</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="titulo">Título del anuncio</label>
                        <div className={styles['input-container']}>
                            <input
                                type="text"
                                id="titulo"
                                minLength={1}
                                maxLength={200}
                                value={titulo_anuncio}
                                onChange={(e) => setTitulo_anuncio(e.target.value)}
                                placeholder="Título del anuncio"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <div className={styles['input-container']}>
                            <textarea
                                id="descripcion"
                                minLength={10}
                                maxLength={500}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Describe la propiedad"
                            />
                        </div>
                    </div>

                    {/* Images preview / upload section */}
                    {/* images section removed from here and moved down to match Publicar layout */}

                    <div>
                        <label htmlFor="precio">Precio de renta (mensual) </label>
                        <div className={styles['input-container']}>
                            <input
                                type="number"
                                id="precio"
                                min={1}
                                max={10000}
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                placeholder="$"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="ubicacion">Ubicación</label>
                        <div className={styles['input-container']}>
                            <input
                                type="text"
                                id="ubicacion"
                                value={ubicacion}
                                minLength={5}
                                maxLength={200}
                                onChange={(e) => setUbicacion(e.target.value)}
                                placeholder="Ejemplo: Calle 123, Colonia, Ciudad, Estado, País"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="tipo">Tipo de propiedad</label>
                        <div className={styles['input-container']}>
                            <select
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="">Seleccione tipo</option>
                                <option>Casa</option>
                                <option>Departamento</option>
                                <option>Cabaña</option>
                                <option>Terreno</option>
                                <option>Local Comercial</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.numeros}>
                        <div>
                            <label htmlFor="habitaciones">Número de habitaciones</label>
                            <div className={styles['input-container']}>
                                <input
                                    type="number"
                                    id="habitaciones"
                                    value={no_habitacion}
                                    onChange={(e) => setNo_Habitacion(e.target.value)}
                                    min="1"
                                    max={10}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="banios">Número de baños</label>
                            <div className={styles['input-container']}>
                                <input
                                    type="number"
                                    id="banios"
                                    value={no_banios}
                                    onChange={(e) => setNo_Banios(e.target.value)}
                                    min="1"
                                    max={10}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="superficie">Superficie (m²)</label>
                            <div className={styles['input-container']}>
                                <input
                                    type="number"
                                    id="superficie"
                                    value={superficie}
                                    onChange={(e) => setSuperficie(e.target.value)}
                                    min="4"
                                    max={1000}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <fieldset className={styles.fieldset}>
                        <legend>Amenidades</legend>
                        <div className={styles['checkbox-group']}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenidades"
                                    value="Jardín"
                                    checked={amenidades.includes('Jardín')}
                                    onChange={handleAmenidadesChange}
                                />
                                Jardín
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenidades"
                                    value="Piscina"
                                    checked={amenidades.includes('Piscina')}
                                    onChange={handleAmenidadesChange}
                                />
                                Piscina
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenidades"
                                    value="Gimnasio"
                                    checked={amenidades.includes('Gimnasio')}
                                    onChange={handleAmenidadesChange}
                                />
                                Gimnasio
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenidades"
                                    value="Seguridad 24/7"
                                    checked={amenidades.includes('Seguridad 24/7')}
                                    onChange={handleAmenidadesChange}
                                />
                                Seguridad 24/7
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="amenidades"
                                    value="Área de juegos"
                                    checked={amenidades.includes('Área de juegos')}
                                    onChange={handleAmenidadesChange}
                                />
                                Área de juegos
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>Servicios</legend>
                        <div className={styles['checkbox-group']}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="servicios"
                                    value="Internet"
                                    checked={servicios.includes('Internet')}
                                    onChange={handleServiciosChange}
                                />
                                Internet
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="servicios"
                                    value="Luz"
                                    checked={servicios.includes('Luz')}
                                    onChange={handleServiciosChange}
                                />
                                Luz
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="servicios"
                                    value="Agua"
                                    checked={servicios.includes('Agua')}
                                    onChange={handleServiciosChange}
                                />
                                Agua
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="servicios"
                                    value="Gas"
                                    checked={servicios.includes('Gas')}
                                    onChange={handleServiciosChange}
                                />
                                Gas
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="servicios"
                                    value="Teléfono"
                                    checked={servicios.includes('Teléfono')}
                                    onChange={handleServiciosChange}
                                />
                                Teléfono
                            </label>
                        </div>
                    </fieldset>

                    <div>
                        <label htmlFor="estacionamiento">Estacionamiento</label>
                        <div className={styles['input-container']}>
                            <select
                                id="estacionamiento"
                                value={estacionamiento}
                                onChange={(e) => setEstacionamiento(e.target.value)}
                                required
                            >
                                <option>No</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3+</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="reglas">Reglas de la propiedad</label>
                        <div className={styles['input-container']}>
                            <textarea
                                id="reglas"
                                value={reglas}
                                maxLength={500}
                                onChange={(e) => setReglas(e.target.value)}
                                placeholder="Reglas de la propiedad"
                            />
                        </div>
                    </div>
                    {/* Images uploader + previews (styled like PublicarAlojamiento) */}
                    <div className={styles['file-uploader-container']}>
                        <label>Imágenes existentes</label>
                        {existingImages.length === 0 ? (
                            <small>No hay imágenes guardadas.</small>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                                gap: '0.75rem',
                                marginTop: '0.5rem'
                            }}>
                                {existingImages.map((img, idx) => (
                                    <div key={img.name + idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="group">
                                        <div style={{
                                            width: '100%',
                                            height: '60px',
                                            borderRadius: '6px',
                                            border: '1px solid #e0e0e0',
                                            overflow: 'hidden',
                                            backgroundColor: '#f5f5f5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <img
                                                src={img.url}
                                                alt={img.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    // fallback to an inline SVG placeholder to avoid depending on a file
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="100%" height="100%" fill="%23f5f5f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="14">No imagen</text></svg>';
                                                }}
                                            />
                                        </div>

                                        {/* delete button (hidden until hover) */}
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(idx)}
                                            style={{
                                                position: 'absolute',
                                                top: '2px',
                                                right: '2px',
                                                backgroundColor: '#dc2626',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                opacity: 0,
                                                transition: 'opacity 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.opacity = '1';
                                                e.currentTarget.style.backgroundColor = '#b91c1c';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.opacity = '0';
                                                e.currentTarget.style.backgroundColor = '#dc2626';
                                            }}
                                        >
                                            ✕
                                        </button>

                                        <p style={{
                                            fontSize: '0.7rem',
                                            marginTop: '0.25rem',
                                            color: '#666',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: '100%',
                                            textAlign: 'center'
                                        }}>{img.name.substring(0, 15)}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: 8 }}>
                            <FileUploader onChange={setNewFiles} />
                        </div>
                    </div>

                    <div className={styles['button-container']}>
                        <button type="submit" className={styles['btn-registrarse']}>
                            Publicar
                        </button>
                        <button
                            type="button"
                            className={styles['btn-regresar']}
                            onClick={handleRegresar}
                        >
                            Regresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Editar;