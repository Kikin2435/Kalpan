import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import './RegistroEstudiante.css';

function RegistroEstudiante() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [role, setRole] = useState('estudiante');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const payload = {
      nombre,
      apellido,
      usuario,
      email,
      password,
      telefono,
      role
    };

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Registro exitoso como ${role}`);
        navigate('/inicio-sesion');
      } else {
        throw new Error(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert(error.message || 'Error al guardar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleRegresar = () => {
    navigate('/inicio-sesion');
  };

  return (
    <div className="centrar-pagina">
      <div className="container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          {/* Selector de rol - ancho completo */}
          <div className="form-group full-width">
            <label className="role-label">Selecciona tu rol:</label>
            <div className="input-container role-select-container">
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >
                <option value="estudiante">Estudiante</option>
                <option value="propietario">Propietario</option>
              </select>
            </div>
          </div>

          {/* Formulario en dos columnas */}
          <div className="form-columns">
            {/* Columna Izquierda */}
            <div className="form-column">
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
                <label>Usuario:</label>
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
            </div>

            {/* Columna Derecha */}
            <div className="form-column">
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