import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import './RegistroEstudiante.css';

function RegistroEstudiante() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState(''); // Nuevo estado para el campo usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden 🔐');
      return;
    }

    // Guardamos los datos en localStorage, incluyendo el usuario
    localStorage.setItem('usuario', JSON.stringify({ nombre, apellido, usuario, email, password, telefono }));

    // Redirigimos al usuario a la página de inicio de sesión
    navigate('/inicio-sesion');
  };

  const handleRegresar = () => {
    // Redirigir al usuario a la página de InicioSesion
    navigate('/inicio-sesion');
  };

  return (
    <div className="centrar-pagina">
      <div className="container">
        <h2>Registro de Estudiante</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre(s):</label>
            <div className="input-container">
              <FaUser />
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </div>
          </div>
          <div>
            <label>Apellido(s):</label>
            <div className="input-container">
              <FaUser />
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingresa tu apellido"
              />
            </div>
          </div>
          <div>
            <label>Usuario:</label> {/* Nuevo campo usuario */}
            <div className="input-container">
              <FaUser />
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
          </div>
          <div>
            <label>Correo Electrónico:</label>
            <div className="input-container">
              <FaEnvelope />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
              />
            </div>
          </div>
          <div>
            <label>Contraseña:</label>
            <div className="input-container">
              <FaLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>
          <div>
            <label>Confirmar Contraseña:</label>
            <div className="input-container">
              <FaLock />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
              />
            </div>
          </div>
          <div>
            <label>Teléfono:</label>
            <div className="input-container">
              <FaPhoneAlt />
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingresa tu teléfono"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="btn-registrarse">Registrarse</button>
            <button type="button" onClick={handleRegresar} className="btn-regresar">Regresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroEstudiante;