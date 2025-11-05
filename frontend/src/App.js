import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import RegistroEstudiante from './pages/RegistroEstudiante';
import Menu from './pages/Menu';
import PublicarAlojamiento from './pages/PublicarAlojamiento';
import Editar from './pages/Editar';
import Usuarios from './pages/Admin/Usuarios';

function App() {
  return (
    <Router>
      <Routes>

        {/* Estudiante y Propietario */}
        <Route path="/" element={<Navigate to="/inicio-sesion" />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistroEstudiante />} />
        <Route path="/menu" element={<Menu />} />

        {/* Propietario */}
        <Route path="/publicar-alojamiento" element={<PublicarAlojamiento />} />
        <Route path="/editar" element={<Editar />} />

        {/* Admin */}
        <Route path="/admin/usuarios" element={<Usuarios />} />

      </Routes>
    </Router>
  );
}

export default App;