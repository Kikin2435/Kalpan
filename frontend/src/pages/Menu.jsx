import React, { useState } from 'react';
import './Menu.css';

function Menu() {
  const [destino, setDestino] = useState('');
  const [precioMinimo, setPrecioMinimo] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);

  const alojamientos = [
    {
      id: 1,
      title: "Habitación de Juan Jonhson",
      desc: "Muy económico",
      price: 300,
      ubicacion: "Centro, Ciudad de México",
      tipo: "Habitación individual",
      habitaciones: 1,
      banos: 1,
      superficie: 20,
      amenidades: "Cama, escritorio, clóset",
      servicios: "Agua, luz, internet",
      estacionamiento: "No disponible",
      reglas: "No fiestas, no mascotas"
    },
    {
      id: 2,
      title: "Cuarto en La Calera",
      desc: "Decoración rústica",
      price: 500,
      ubicacion: "La Calera, Puebla",
      tipo: "Habitación compartida",
      habitaciones: 2,
      banos: 1,
      superficie: 35,
      amenidades: "Camas, cocina compartida",
      servicios: "Agua, luz",
      estacionamiento: "1 auto",
      reglas: "No se permite fumar"
    },
    {
      id: 3,
      title: "Estudio moderno en Monterrey",
      desc: "Ideal para estudiantes",
      price: 750,
      ubicacion: "San Pedro, Monterrey",
      tipo: "Estudio",
      habitaciones: 1,
      banos: 1,
      superficie: 28,
      amenidades: "Cama, escritorio, cocina equipada",
      servicios: "Agua, luz, gas, internet",
      estacionamiento: "1 lugar techado",
      reglas: "No fiestas"
    },
    {
      id: 4,
      title: "Departamento completo",
      desc: "Con vista al mar",
      price: 1200,
      ubicacion: "Zona Hotelera, Cancún",
      tipo: "Departamento",
      habitaciones: 2,
      banos: 2,
      superficie: 70,
      amenidades: "Sala, comedor, cocina equipada",
      servicios: "Todo incluido",
      estacionamiento: "2 autos",
      reglas: "No mascotas"
    },
    {
      id: 5,
      title: "Habitación en Guadalajara",
      desc: "A pasos del centro histórico",
      price: 450,
      ubicacion: "Centro, Guadalajara",
      tipo: "Habitación individual",
      habitaciones: 1,
      banos: 1,
      superficie: 18,
      amenidades: "Cama individual, escritorio",
      servicios: "Agua, luz, internet",
      estacionamiento: "No disponible",
      reglas: "No fumar, no visitas"
    },
    {
      id: 6,
      title: "Loft artístico",
      desc: "Ambiente bohemio",
      price: 980,
      ubicacion: "Roma Norte, CDMX",
      tipo: "Loft",
      habitaciones: 1,
      banos: 1,
      superficie: 40,
      amenidades: "Estudio, libreros, cocina",
      servicios: "Agua, luz, internet, gas",
      estacionamiento: "1 lugar",
      reglas: "No fiestas, no ruido después de las 10"
    },
    {
      id: 7,
      title: "Mini departamento",
      desc: "Compacto pero funcional",
      price: 600,
      ubicacion: "Col. Doctores, CDMX",
      tipo: "Departamento",
      habitaciones: 1,
      banos: 1,
      superficie: 25,
      amenidades: "Cama, cocina, baño privado",
      servicios: "Agua, luz",
      estacionamiento: "No",
      reglas: "No mascotas"
    },
    {
      id: 8,
      title: "Casa compartida",
      desc: "Ambiente amigable",
      price: 550,
      ubicacion: "Zapopan, Jalisco",
      tipo: "Casa compartida",
      habitaciones: 3,
      banos: 2,
      superficie: 100,
      amenidades: "Sala, cocina, patio",
      servicios: "Todos incluidos",
      estacionamiento: "Calle",
      reglas: "No fiestas, respeto mutuo"
    }
  ];
  

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const alojamientosFiltrados = alojamientos.filter(item => {
    return (
      (destino === '' || item.ubicacion.toLowerCase().includes(destino.toLowerCase())) &&
      (precioMinimo === '' || item.price >= precioMinimo) &&
      (precioMaximo === '' || item.price <= precioMaximo)
    );
  });

  return (
    <>
      <nav>
        <div id="Logo"></div>
        <div className="nav-text"></div>
        <div id="Sesion">
          <ul className="dropdown">
            <li><a href="Anunciar_Alojamiento.html">Pon tu casa en Kalpan</a></li>
            <li><a href="Inicio.html">Nosotros</a></li>
            <li><a href="#">Configuración</a></li>
            <li><a href="#">Centro de ayuda</a></li>
            <li><a href="inicio-sesion"><b>Cerrar Sesión</b></a></li>
          </ul>
        </div>
      </nav>

      <main>
        <div id="Main-2">
          <div id="Maps"><div></div></div>
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
          </div>
        </div>

        <div id="Main-3">
          {alojamientosFiltrados.map((item) => (
            <div
              className="M-D"
              key={item.id}
              onClick={() => setAlojamientoSeleccionado(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="M-D-I" id={`I-${item.id}`}></div>
              <div className="M-D-T">
                <h4>{item.title}</h4>
                <p>{item.ubicacion}</p>
                <h4>${item.price}</h4>
              </div>
            </div>
          ))}
        </div>

        {alojamientoSeleccionado && (
          <div className="modal-overlay" onClick={() => setAlojamientoSeleccionado(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setAlojamientoSeleccionado(null)}
              >
                ✖
              </button>
              <h2>{alojamientoSeleccionado.title}</h2>
              <p><strong>Descripción:</strong> {alojamientoSeleccionado.desc}</p>
              <p><strong>Precio:</strong> ${alojamientoSeleccionado.price}</p>
              <p><strong>Ubicación:</strong> {alojamientoSeleccionado.ubicacion}</p>
              <p><strong>Tipo de propiedad:</strong> {alojamientoSeleccionado.tipo}</p>
              <p><strong>Habitaciones:</strong> {alojamientoSeleccionado.habitaciones}</p>
              <p><strong>Baños:</strong> {alojamientoSeleccionado.banos}</p>
              <p><strong>Superficie:</strong> {alojamientoSeleccionado.superficie} m²</p>
              <p><strong>Amenidades:</strong> {alojamientoSeleccionado.amenidades}</p>
              <p><strong>Servicios:</strong> {alojamientoSeleccionado.servicios}</p>
              <p><strong>Estacionamiento:</strong> {alojamientoSeleccionado.estacionamiento}</p>
              <p><strong>Reglas de la propiedad:</strong> {alojamientoSeleccionado.reglas}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Menu;