import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import RegistroEstudiante from './pages/RegistroEstudiante';
import Menu from './pages/Menu';
import PublicarAlojamiento from './pages/PublicarAlojamiento';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio-sesion" />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistroEstudiante />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/publicar-alojamiento" element={<PublicarAlojamiento />} />
      </Routes>
    </Router>
  );
}

export default App;