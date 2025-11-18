import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Menu() {
  const [destino, setDestino] = useState('');
  const [precioMinimo, setPrecioMinimo] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [alojamientosFiltrados, setAlojamientosFiltrados] = useState([]);
  const [modalImageIndex, setModalImageIndex] = useState(0); 
  const [alojamientos, setAlojamientos] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const parseImagenField = (imgField) => {
      if (!imgField) return [];
      let arr = null;

      if (typeof imgField === 'string' && (/^\s*\[/.test(imgField) || /^\s*\{/.test(imgField))) {
        try { arr = JSON.parse(imgField); } catch (e) { arr = null; }
      }

      if (!arr) {
        if (typeof imgField === 'string') arr = imgField.split(',');
        else if (Array.isArray(imgField)) arr = imgField;
        else arr = [];
      }

      return arr
        .map(s => (s || '').toString().trim())
        .filter(Boolean)
        .map(fname => `http://localhost:4000/uploads/${encodeURIComponent(fname)}`);
    };

    fetch('http://localhost:4000/alojamientos')
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        
        if (!Array.isArray(data)) {
          console.error('El backend no devolvió un array:', data);
          setAlojamientos([]);
          return;
        }

        const alojamientosConImagen = data.map((item, index) => {
          let imageUrls = parseImagenField(item.imagen);
          if (imageUrls.length === 0) {
            imageUrls = ['http://localhost:4000/uploads/placeholder.jpg']; // placeholder default
          }

          return {
            id: item.id_alojamiento || index,
            title: item.titulo_anuncio || 'Propiedad sin título',
            desc: item.descripcion || '',
            price: item.precio || 0,
            ubicacion: item.ubicacion || 'Ubicación desconocida',
            tipo: item.tipo || '',
            habitaciones: item.no_habitacion || 0,
            banos: item.no_banios || 0,
            superficie: item.superficie || 0,
            amenidades: item.amenidades || 'Sin amenidades',
            servicios: item.servicios || 'Sin servicios',
            estacionamiento: item.estacionamiento || 'Sin estacionamiento',
            reglas: item.reglas || '',
            images: imageUrls,
            status: item.status || true,
            image: imageUrls[0],
          };
        });

        console.log('Alojamientos procesados:', alojamientosConImagen);
        setAlojamientos(alojamientosConImagen);
      })
      .catch(err => {
        console.error('Error al obtener alojamientos del backend:', err);
        setAlojamientos([]);
      });
  }, []);

  const handleSearch = () => {
    const min = precioMinimo ? Number(precioMinimo) : 0;
    const max = precioMaximo ? Number(precioMaximo) : Infinity;

    const filtered = alojamientos.filter(item => {
      return (
        (destino === '' || item.ubicacion.toLowerCase().includes(destino.toLowerCase())) &&
        item.price >= min &&
        item.price <= max
      );
    });
    setAlojamientosFiltrados(filtered);
  };

  const handleClear = () => {
    setDestino('');
    setPrecioMinimo('');
    setPrecioMaximo('');
    setAlojamientosFiltrados([]);
  };

  const handleEdit = () => {
    navigate('/editar', { state: { alojamiento: alojamientoSeleccionado } });
  };

  const SolicitarVisita = async (e) => {
    e.preventDefault();
    const solicitud = {
      id_alojamiento: alojamientoSeleccionado.id,
      id_estudiante: user.id,
      estatus: 'pendiente',
      fecha: Date.now(),
    };

    try {
      const response = await fetch('http://localhost:4000/crearSolicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitud)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al solicitar visita');
      }
      
      console.log('Solicitud exitosa:', data.solicitud);
      localStorage.setItem('user', JSON.stringify(data.solicitud));
      alert(`Solicitud exitosa`);
      
    } catch (error) {
      console.error('Error al solicitar visita:', error.message);
      alert(error.message || '');
    }
  };

  // Funcion para eliminar un alojamiento
  const handleEliminar = async () => {
    const id_seleccionado = alojamientoSeleccionado.id;
    try {
      const response = await fetch('http://localhost:4000/delAlojamiento', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id_seleccionado })
      });


      if (!response.ok) throw new Error("Error al eliminar en el servidor");

      const data = await response.json();
      console.log('Alojamiento eliminado correctamente: ', data);

      setAlojamientoSeleccionado(null);

      setAlojamientos(prev => prev.filter(a => a.id !== id_seleccionado));
      setAlojamientoSeleccionado(null);

    } catch (error) {
      console.error("Error en la base de datos: ", error.message);
    }
  };

  const isButtonVisible = destino || precioMinimo || precioMaximo;
  const displayAlojamientos = alojamientosFiltrados.length > 0 ? alojamientosFiltrados : alojamientos;

  return (
    <>
      <nav>
        <div id="Logo"></div>
        <div className="nav-text"></div>
        <div id="Sesion">
          <div className="user-icon"></div>
          <ul className="dropdown">
            {user.role === 'propietario' && (
              <li><a href="/publicar-alojamiento">Pon tu casa en Kalpan</a></li>
            )}
            <li>{user?.usuario || 'Invitado'}</li>
            <li><a href="/inicio-sesion"><b>Cerrar Sesión</b></a></li>
          </ul>
        </div>
      </nav>

      <main>
        <div id="Main-2">
          <div id="Submenu">
            <div id="S-1">
              <h3>Destino</h3>
              <input
                type="text"
                placeholder="Buscar destinos"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </div>
            <div id="S-2">
              <h3>Precio Mínimo</h3>
              <input
                type="number"
                placeholder="Precio mínimo"
                value={precioMinimo}
                onChange={(e) => setPrecioMinimo(e.target.value)}
              />
            </div>
            <div id="S-3">
              <h3>Precio Máximo</h3>
              <input
                type="number"
                placeholder="Precio máximo"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(e.target.value)}
              />
            </div>
            <div className="buttons-container">
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  display: isButtonVisible ? 'flex' : 'none',
                  height: '40px',
                  alignSelf: 'flex-end',
                  marginBottom: '10px',
                  borderRadius: '25px',
                  textTransform: 'none',
                  fontSize: '14px',
                  backgroundColor: '#1a73e8',
                  color: '#ffffff',
                  marginRight: '10px',
                  '&:hover': {
                    backgroundColor: '#1557b0',
                  },
                }}
              >
                Buscar
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{
                  display: isButtonVisible ? 'flex' : 'none',
                  height: '40px',
                  alignSelf: 'flex-end',
                  marginBottom: '10px',
                  borderRadius: '25px',
                  textTransform: 'none',
                  fontSize: '14px',
                  borderColor: '#bdbdbd',
                  color: '#555',
                  '&:hover': {
                    borderColor: '#1a73e8',
                    color: '#1a73e8',
                    backgroundColor: '#f0f4ff',
                  },
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>

        <div id="Main-3">
          {displayAlojamientos && displayAlojamientos.length > 0 ? (
            displayAlojamientos.map((item) => (
            <Card
              sx={{
                width: 300,
                height: 340,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              key={item.id}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'rgba(200, 220, 255, 0.5)',
                    '& .MuiTypography-root': {
                      color: '#1a73e8',
                    },
                  },
                }}
                onClick={() => { setAlojamientoSeleccionado(item); setModalImageIndex(0); }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                />
                <CardContent sx={{ flexGrow: 1, padding: '12px' }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {item.ubicacion}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ color: '#1a73e8', fontWeight: 500 }}>
                    ${item.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#999' }}>
              <Typography>No hay alojamientos disponibles</Typography>
            </div>
          )}
        </div>        {alojamientoSeleccionado && (
          <div className="modal-overlay" onClick={() => setAlojamientoSeleccionado(null)}>
            <div className="modal-content modal-animated" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setAlojamientoSeleccionado(null)}
              >
                ✖
              </button>
              <div className="modal-inner">
                <div className="modal-image" style={{ position: 'relative' }}>
                  {/* Imagen principal de la galería (usa images[] si existe) */}
                  <img
                    src={(alojamientoSeleccionado.images && alojamientoSeleccionado.images[modalImageIndex]) || alojamientoSeleccionado.image}
                    alt={alojamientoSeleccionado.title}
                    className="gallery-main"
                    style={{ width: '100%', borderRadius: '8px' }}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Botón eliminar */}
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      minWidth: '30px',
                      width: '30px',
                      height: '30px',
                      padding: 0,
                      borderRadius: '50%',
                      backgroundColor: '#ff0000',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#cc0000' },
                      fontSize: '16px',
                      zIndex: 5,
                    }}
                    onClick={(e) => { e.stopPropagation(); handleEliminar(); }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>

                  {/* Flechas de navegación */}
                  {alojamientoSeleccionado.images && alojamientoSeleccionado.images.length > 1 && (
                    <>
                      <button
                        className="gallery-arrow left"
                        onClick={(e) => {
                          e.stopPropagation();
                          const len = alojamientoSeleccionado.images.length;
                          setModalImageIndex((idx) => (idx - 1 + len) % len);
                        }}
                        aria-label="Anterior"
                      >
                        ‹
                      </button>
                      <button
                        className="gallery-arrow right"
                        onClick={(e) => {
                          e.stopPropagation();
                          const len = alojamientoSeleccionado.images.length;
                          setModalImageIndex((idx) => (idx + 1) % len);
                        }}
                        aria-label="Siguiente"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Miniaturas */}
                  {alojamientoSeleccionado.images && alojamientoSeleccionado.images.length > 1 && (
                    <div className="gallery-thumbs" onClick={(e) => e.stopPropagation()}>
                      {alojamientoSeleccionado.images.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`${alojamientoSeleccionado.title} - ${idx + 1}`}
                          className={`thumb-img ${idx === modalImageIndex ? 'thumb-selected' : ''}`}
                          onClick={() => setModalImageIndex(idx)}
                        />
                      ))}
                    </div>
                  )}
                </div>


                <div className="modal-details">
                  <Typography className="modal-title" variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                    {alojamientoSeleccionado.title}
                  </Typography>

                  <div className="detail-item detail-description">
                    <div className="detail-label">Descripción:</div>
                    <div className="detail-value">{alojamientoSeleccionado.desc || '—'}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Precio:</div>
                    <div className="detail-value">${alojamientoSeleccionado.price}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Ubicación:</div>
                    <div className="detail-value">{alojamientoSeleccionado.ubicacion}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Tipo de propiedad:</div>
                    <div className="detail-value">{alojamientoSeleccionado.tipo || '—'}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Habitaciones:</div>
                    <div className="detail-value">{alojamientoSeleccionado.habitaciones}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Baños:</div>
                    <div className="detail-value">{alojamientoSeleccionado.banos}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Superficie:</div>
                    <div className="detail-value">{alojamientoSeleccionado.superficie} m²</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Amenidades:</div>
                    <div className="detail-value">{alojamientoSeleccionado.amenidades}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Servicios:</div>
                    <div className="detail-value">{alojamientoSeleccionado.servicios}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Estacionamiento:</div>
                    <div className="detail-value">{alojamientoSeleccionado.estacionamiento}</div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">Reglas de la propiedad:</div>
                    <div className="detail-value">{alojamientoSeleccionado.reglas || '—'}</div>
                  </div>

                  <div className="modal-actions">
                    {user.role === 'estudiante' && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#1a73e8',
                          '&:hover': { backgroundColor: '#1557b0' },
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontSize: '16px',
                          padding: '10px 24px',
                          width: 'auto',
                        }}
                        onClick={() => alert('Funcionalidad de reservar aún no implementada')}
                      >
                        Reservar Ahora
                      </Button>
                    )}
                    {user.role === 'estudiante' && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#1a73e8',
                          '&:hover': { backgroundColor: '#1557b0' },
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontSize: '16px',
                          padding: '10px 24px',
                          width: 'auto',
                        }}
                        onClick={SolicitarVisita}
                      >
                        Solicitar Visita
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1a73e8',
                        '&:hover': { backgroundColor: '#1557b0' },
                        borderRadius: '25px',
                        textTransform: 'none',
                        fontSize: '16px',
                        padding: '10px 24px',
                        width: 'auto',
                      }}
                      onClick={handleEdit}
                    >
                      Editar Alojamiento
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Menu;