import React, { useEffect, useState } from 'react';
import './Menu.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

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
  const [alojamientoImagen,setAlojamientoImagen] = useState([]);

  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/alojamientos')
      .then(res => res.json())
      .then(data => {
        const imagenes = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8];
  
        const alojamientosConImagen = data.map((item, index) => ({
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
          image: imagenes[index % imagenes.length] // por ahora, imagen local
          // Si usas imágenes reales desde BD, usa item.imagen
        }));
  
        setAlojamientos(alojamientosConImagen);
      })
      .catch(err => {
        console.error('❌ Error al obtener alojamientos del backend:', err);
      });
  }, []);
  

  // const alojamientos = [
  //   {
  //     id: 1,
  //     title: "Habitación de Juan Jonhson",
  //     desc: "Muy económico",
  //     price: 300,
  //     ubicacion: "Centro, Ciudad de México",
  //     tipo: "Habitación individual",
  //     habitaciones: 1,
  //     banos: 1,
  //     superficie: 20,
  //     amenidades: "Cama, escritorio, clóset",
  //     servicios: "Agua, luz, internet",
  //     estacionamiento: "No disponible",
  //     reglas: "No fiestas, no mascotas",
  //     image: imagen1,
  //   },
  //   {
  //     id: 2,
  //     title: "Cuarto en La Calera",
  //     desc: "Decoración rústica",
  //     price: 500,
  //     ubicacion: "La Calera, Puebla",
  //     tipo: "Habitación compartida",
  //     habitaciones: 2,
  //     banos: 1,
  //     superficie: 35,
  //     amenidades: "Camas, cocina compartida",
  //     servicios: "Agua, luz",
  //     estacionamiento: "1 auto",
  //     reglas: "No se permite fumar",
  //     image: imagen2,
  //   },
  //   {
  //     id: 3,
  //     title: "Estudio moderno en Monterrey",
  //     desc: "Ideal para estudiantes",
  //     price: 750,
  //     ubicacion: "San Pedro, Monterrey",
  //     tipo: "Estudio",
  //     habitaciones: 1,
  //     banos: 1,
  //     superficie: 28,
  //     amenidades: "Cama, escritorio, cocina equipada",
  //     servicios: "Agua, luz, gas, internet",
  //     estacionamiento: "1 lugar techado",
  //     reglas: "No fiestas",
  //     image: imagen3,
  //   },
  //   {
  //     id: 4,
  //     title: "Departamento completo",
  //     desc: "Con vista al mar",
  //     price: 1200,
  //     ubicacion: "Zona Hotelera, Cancún",
  //     tipo: "Departamento",
  //     habitaciones: 2,
  //     banos: 2,
  //     superficie: 70,
  //     amenidades: "Sala, comedor, cocina equipada",
  //     servicios: "Todo incluido",
  //     estacionamiento: "2 autos",
  //     reglas: "No mascotas",
  //     image: imagen4,
  //   },
  //   {
  //     id: 5,
  //     title: "Habitación en Guadalajara",
  //     desc: "A pasos del centro histórico",
  //     price: 450,
  //     ubicacion: "Centro, Guadalajara",
  //     tipo: "Habitación individual",
  //     habitaciones: 1,
  //     banos: 1,
  //     superficie: 18,
  //     amenidades: "Cama individual, escritorio",
  //     servicios: "Agua, luz, internet",
  //     estacionamiento: "No disponible",
  //     reglas: "No fumar, no visitas",
  //     image: imagen5,
  //   },
  //   {
  //     id: 6,
  //     title: "Loft artístico",
  //     desc: "Ambiente bohemio",
  //     price: 980,
  //     ubicacion: "Roma Norte, CDMX",
  //     tipo: "Loft",
  //     habitaciones: 1,
  //     banos: 1,
  //     superficie: 40,
  //     amenidades: "Estudio, libreros, cocina",
  //     servicios: "Agua, luz, internet, gas",
  //     estacionamiento: "1 lugar",
  //     reglas: "No fiestas, no ruido después de las 10",
  //     image: imagen6,
  //   },
  //   {
  //     id: 7,
  //     title: "Mini departamento",
  //     desc: "Compacto pero funcional",
  //     price: 600,
  //     ubicacion: "Col. Doctores, CDMX",
  //     tipo: "Departamento",
  //     habitaciones: 1,
  //     banos: 1,
  //     superficie: 25,
  //     amenidades: "Cama, cocina, baño privado",
  //     servicios: "Agua, luz",
  //     estacionamiento: "No",
  //     reglas: "No mascotas",
  //     image: imagen7,
  //   },
  //   {
  //     id: 8,
  //     title: "Casa compartida",
  //     desc: "Ambiente amigable",
  //     price: 550,
  //     ubicacion: "Zapopan, Jalisco",
  //     tipo: "Casa compartida",
  //     habitaciones: 3,
  //     banos: 2,
  //     superficie: 100,
  //     amenidades: "Sala, cocina, patio",
  //     servicios: "Todos incluidos",
  //     estacionamiento: "Calle",
  //     reglas: "No fiestas, respeto mutuo",
  //     image: imagen8,
  //   }
  // ];

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
                <div className="modal-image">
                  <img
                    src={alojamientoSeleccionado.image}
                    alt={alojamientoSeleccionado.title}
                    className="modal-image"
                  />
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
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1a73e8',
                      '&:hover': { backgroundColor: '#1557b0' },
                      borderRadius: '25px',
                      textTransform: 'none',
                      fontSize: '16px',
                      padding: '10px 20px',
                      width: '100%',
                    }}
                    onClick={() => alert('Funcionalidad de reservar aún no implementada')}
                  >
                    Reservar Ahora
                  </Button>
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