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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estudiante = {
      nombre,
      apellido,
      usuario,
      email,
      password,
      telefono
    };

    try {
      const response = await fetch('http://localhost:4000/crearEstudiante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
      });

      if (response.ok) {
        navigate('/inicio-sesion');
      } else {
        throw new Error('Error al registrar el estudiante');
      }
    } catch (error) {
      console.error('Error al guardar el estudiante:', error);
      alert('Error al guardar el estudiante. Por favor, inténtalo de nuevo.');
    }
  };

  const handleRegresar = () => {
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
                minLength={1}
                maxLength={30}
                required
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
                minLength={1}
                maxLength={30}
                required
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
                minLength={3}
                required
                maxLength={10}
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
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                minLength={8}
                maxLength={50}
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
                minLength={8}
                required
                maxLength={16}
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
                minLength={8}
                required
                maxLength={16}
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
                minLength={10}
                required
                maxLength={10}
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