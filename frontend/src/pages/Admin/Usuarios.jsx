import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Usuarios.css';

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:4000/estudiantes');
            if (!res.ok) throw new Error(`Error fetching: ${res.status}`);
            const data = await res.json();
            setUsers(data || []);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Error desconocido');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter((u) =>
            Object.values(u).some((v) =>
                v !== null && v !== undefined && String(v).toLowerCase().includes(q)
            )
        );
    }, [users, search]);

    const formatDate = (d) => {
        if (!d) return '';
        const dt = new Date(d);
        return dt.toLocaleString();
    };

    return (
        <>
            <nav className="kp-nav" aria-label="Banner estático">
                <div id="Logo" className="kp-logo" role="img" aria-hidden="true" />
                <div className="kp-nav-spacer" />

                {/* botones de navegación del admin */}
                <div className="kp-nav-buttons">
                    <Link to="/admin/usuarios" className="kp-nav-btn kp-nav-btn--active">Usuarios</Link>
                    <Link to="/admin/alojamientos" className="kp-nav-btn">Alojamientos</Link>
                </div>
            </nav>

            <header id="Main-2" className="kp-banner">
                <div id="Submenu" className="kp-submenu">
                    <div id="S-1" className="kp-searchbox">
                        <input
                            type="search"
                            placeholder="Buscar por nombre, usuario, email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            aria-label="Buscar usuarios"
                        />
                    </div>
                </div>
            </header>

            <main>
                <div className="usuarios-container">
                    <h2 className="usuarios-title">Usuarios (Estudiantes)</h2>

                    {error && <div className="error">Error: {error}</div>}

                    {loading ? (
                        <div className="loading">Cargando...</div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="usuarios-table" role="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Usuario</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Fecha registro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((u) => (
                                        <tr key={u.id_estudiante}>
                                            <td>{u.id_estudiante}</td>
                                            <td>{u.nombre}</td>
                                            <td>{u.apellido}</td>
                                            <td>{u.usuario}</td>
                                            <td>{u.email}</td>
                                            <td>{u.telefono}</td>
                                            <td>{formatDate(u.fecha_registro || u.createdAt)}</td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="no-results">
                                                No se encontraron usuarios.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Usuarios;