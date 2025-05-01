import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PublicarAlojamiento.module.css';

function PublicarAlojamiento() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [banios, setBanios] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [amenidades, setAmenidades] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estacionamiento, setEstacionamiento] = useState('');
  const [reglas, setReglas] = useState('');
  const [media, setMedia] = useState([]);
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
    setMedia([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const propiedad = {
      titulo,
      descripcion,
      precio,
      ubicacion,
      tipo,
      habitaciones,
      banios,
      superficie,
      amenidades,
      servicios,
      estacionamiento,
      reglas,
      media: media.map((file) => file.name),
    };
    localStorage.setItem('propiedad', JSON.stringify(propiedad));
    navigate('/menu');
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
        <h2>Publicar Propiedad</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título del anuncio</label>
            <div className={styles['input-container']}>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
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
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe la propiedad"
              />
            </div>
          </div>

          <div>
            <label htmlFor="precio">Precio de venta</label>
            <div className={styles['input-container']}>
              <input
                type="number"
                id="precio"
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
                  value={habitaciones}
                  onChange={(e) => setHabitaciones(e.target.value)}
                  min="1"
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
                  value={banios}
                  onChange={(e) => setBanios(e.target.value)}
                  min="1"
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
                  min="1"
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
                onChange={(e) => setReglas(e.target.value)}
                placeholder="Reglas de la propiedad"
              />
            </div>
          </div>

          <div>
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
              {media.map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
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

export default PublicarAlojamiento;