import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Alojamientos.css';

export default function Alojamientos() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setError(null);
            setLoading(true);
            const resAlo = await fetch('http://localhost:4000/alojamientos');
            console.log('alojamientos status', resAlo.status);
            if (!resAlo.ok) throw new Error(`Error al obtener alojamientos: ${resAlo.status}`);
            const dataAlo = await resAlo.json();
            console.log('alojamientos response:', dataAlo);
            setItems(dataAlo || []);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Error desconocido');
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;
        return items.filter((a) =>
            Object.values(a).some((v) =>
                v !== null && v !== undefined && String(v).toLowerCase().includes(q)
            )
        );
    }, [items, search]);

    const fmtDate = (d) => {
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
                    <Link to="/admin/usuarios" className="kp-nav-btn">Usuarios</Link>
                    <Link to="/admin/alojamientos" className="kp-nav-btn kp-nav-btn--active">Alojamientos</Link>
                </div>
            </nav>

            <header id="Main-2" className="kp-banner">
                <div id="Submenu" className="kp-submenu">
                    <div id="S-1" className="kp-searchbox">
                        <input
                            type="search"
                            placeholder="Buscar por título, ubicación, tipo..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            aria-label="Buscar alojamientos"
                        />
                    </div>
                </div>
            </header>

            <main>
                <div className="alojamientos-container">
                    <h2 className="alojamientos-title">Alojamientos</h2>

                    {error && <div className="error">Error: {error}</div>}

                    {loading ? (
                        <div className="loading">Cargando alojamientos...</div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="alojamientos-table" role="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Ubicación</th>
                                        <th>Precio</th>
                                        <th>Tipo</th>
                                        <th>Hab.</th>
                                        <th>Baños</th>
                                        <th>Superficie</th>
                                        <th>Creado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((a) => (
                                        <tr key={a.id_alojamiento ?? a.id}>
                                            <td>{a.id_alojamiento ?? a.id}</td>
                                            <td>{a.titulo_anuncio}</td>
                                            <td>{a.ubicacion}</td>
                                            <td>{a.precio != null ? a.precio : '-'}</td>
                                            <td>{a.tipo}</td>
                                            <td>{a.no_habitacion}</td>
                                            <td>{a.no_banios}</td>
                                            <td>{a.superficie}</td>
                                            <td>{fmtDate(a.createdAt || a.fecha_registro)}</td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="no-results">
                                                No se encontraron alojamientos.
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