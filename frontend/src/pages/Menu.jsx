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


import imagen1 from './Img/c-1.png';
import imagen2 from './Img/c-2.png';
import imagen3 from './Img/c-3.png';
import imagen4 from './Img/c-4.png';
import imagen5 from './Img/c-5.png';
import imagen6 from './Img/c-6.png';
import imagen7 from './Img/c-7.png';
import imagen8 from './Img/c-8.png';

function Menu() {
  const [destino, setDestino] = useState('');
  const [precioMinimo, setPrecioMinimo] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [alojamientosFiltrados, setAlojamientosFiltrados] = useState(null);
  const [alojamientoImagen, setAlojamientoImagen] = useState([]);
  const navigate = useNavigate();

  const [alojamientos, setAlojamientos] = useState([]);

  // Frontend: reemplazar useEffect existente
useEffect(() => {
  const parseImagenField = (imgField) => {
    if (!imgField) return [];
    let arr = null;

    // Si viene como JSON (["a.jpg","b.jpg"]) intenta parsear
    if (typeof imgField === 'string' && (/^\s*\[/.test(imgField) || /^\s*\{/.test(imgField))) {
      try { arr = JSON.parse(imgField); } catch (e) { arr = null; }
    }

    // Si no es JSON, si es string separamos por comas
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
      const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8];

      const alojamientosConImagen = data.map((item, index) => {
        let imageUrls = parseImagenField(item.imagen);

        if (imageUrls.length === 0) {
          imageUrls = [imagenes[index % imagenes.length]];
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
          images: imageUrls,            // array completo
          image: imageUrls[0] || null,  // primera imagen — usado en CardMedia y modal
        };
      });

      setAlojamientos(alojamientosConImagen);
    })
    .catch(err => {
      console.error('❌ Error al obtener alojamientos del backend:', err);
    });
}, []);

  const handleSearch = () => {
    const filtered = alojamientos.filter(item => {
      return (
        (destino === '' || item.ubicacion.toLowerCase().includes(destino.toLowerCase())) &&
        (precioMinimo === '' || item.price >= precioMinimo) &&
        (precioMaximo === '' || item.price <= precioMaximo)
      );
    });
    setAlojamientosFiltrados(filtered);
  };

  const handleClear = () => {
    setDestino('');
    setPrecioMinimo('');
    setPrecioMaximo('');
    setAlojamientosFiltrados(null);
  };

  const handleEdit = () => {
    navigate('/editar', { state: { alojamiento: alojamientoSeleccionado } });
  }

  const handleEliminar = async () => {
    const id_seleccionado = alojamientoSeleccionado.id;
    console.log(id_seleccionado);
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
  const displayAlojamientos = alojamientosFiltrados || alojamientos;

  return (
    <>
      <nav>
        <div id="Logo"></div>
        <div className="nav-text"></div>
        <div id="Sesion">
          <div className="user-icon"></div>
          <ul className="dropdown">
            <li><a href="publicar-alojamiento">Pon tu casa en Kalpan</a></li>
            <li><a href="inicio-sesion"><b>Cerrar Sesión</b></a></li>
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
          {displayAlojamientos.map((item) => (
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
                onClick={() => setAlojamientoSeleccionado(item)}
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
          ))}
        </div>

        {alojamientoSeleccionado && (
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
                  <img
                    src={alojamientoSeleccionado.image}
                    alt={alojamientoSeleccionado.title}
                    className="modal-image"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
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
                    }}
                    onClick={handleEliminar}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </div>


                <div className="modal-details">
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#333', textAlign: 'center' }}>
                    {alojamientoSeleccionado.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Descripción:</strong> {alojamientoSeleccionado.desc}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Precio:</strong> ${alojamientoSeleccionado.price}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Ubicación:</strong> {alojamientoSeleccionado.ubicacion}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Tipo de propiedad:</strong> {alojamientoSeleccionado.tipo}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Habitaciones:</strong> {alojamientoSeleccionado.habitaciones}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Baños:</strong> {alojamientoSeleccionado.banos}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Superficie:</strong> {alojamientoSeleccionado.superficie} m²
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Amenidades:</strong> {alojamientoSeleccionado.amenidades}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Servicios:</strong> {alojamientoSeleccionado.servicios}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                    <strong>Estacionamiento:</strong> {alojamientoSeleccionado.estacionamiento}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                    <strong>Reglas de la propiedad:</strong> {alojamientoSeleccionado.reglas}
                  </Typography>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1a73e8',
                        '&:hover': { backgroundColor: '#1557b0' },
                        borderRadius: '25px',
                        textTransform: 'none',
                        fontSize: '16px',
                        padding: '10px 20px',
                        width: 'auto',
                        flex: 1,
                      }}
                      onClick={() => alert('Funcionalidad de reservar aún no implementada')}
                    >
                      Reservar Ahora
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1a73e8',
                        '&:hover': { backgroundColor: '#1557b0' },
                        borderRadius: '25px',
                        textTransform: 'none',
                        fontSize: '16px',
                        padding: '10px 20px',
                        width: 'auto',
                        flex: 1,
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