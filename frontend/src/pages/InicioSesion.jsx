import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importamos los iconos de FontAwesome
import './InicioSesion.css'; // Asegúrate de importar tu CSS

function InicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  localStorage.clear();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      email,
      password
    };
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      
      // Login exitoso: guardar datos del usuario si es necesario
      console.log('Usuario autenticado:', data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/menu');
      
    } catch (error) {
      console.error('Error en la base de datos:', error.message);
      alert(error.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="inicio-sesion-page">
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <div className="input-container">
              <FaEnvelope />
              <input
                type="email"
                name="email"
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>
          <button type="submit" className="btn-iniciar">Entrar</button>
        </form>
        <p>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default InicioSesion;
