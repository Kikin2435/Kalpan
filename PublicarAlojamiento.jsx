import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PublicarAlojamiento.module.css';

function PublicarAlojamiento() {
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
  const [imagen, setImagen] = useState([]);
  const navigate = useNavigate();

  const handleAmenidadesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenidades([...amenidades, value]);
    } else {
      setAmenidades(amenidades.filter((item) => item !== value));
    }
  };

  const handleServiciosChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServicios([...servicios, value]);
    } else {
      setServicios(servicios.filter((item) => item !== value));
    }
  };

  const handleMediaChange = (e) => {
    setImagen([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_propietario = 1; 
  
    const propiedad = {
      titulo_anuncio,
      descripcion,
      precio,
      ubicacion,
      tipo,
      no_habitacion,
      no_banios,
      superficie,
      amenidades: amenidades.join(', '),
      servicios: servicios.join(', '),
      estacionamiento,
      reglas,
      id_propietario, 
    };
  
    console.log('Enviando propiedad:', propiedad);
  
    try {
      const response = await fetch('http://localhost:4000/crearAlojamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propiedad),
      });
  
      if (!response.ok) throw new Error('Error al guardar en el servidor');
  
      const data = await response.json();
      console.log('Propiedad publicada correctamente:', data);
      navigate('/menu');
    } catch (error) {
      console.error('Error en la base de datos:', error);
    }
  };
  

  const handleRegresar = () => {
    navigate('/menu');
  };

  return (
    <div className={styles['centrar-pagina']}>
      <nav className={styles.nav}>
        <div className={styles.Logo}></div>
      </nav>
      <div className={styles.container}>
        <h2>Publicar Alojamiento</h2>
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
                minLength={20}
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

          {/* <div>
            <label htmlFor="media">Imágenes y videos</label>
            <div className={styles['input-container']}>
              <input
                type="file"
                id="media"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaChange}
                required
              />
            </div>
            <div className={styles['file-names']}>
              {imagen.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
          </div> */}

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

export default PublicarAlojamiento;