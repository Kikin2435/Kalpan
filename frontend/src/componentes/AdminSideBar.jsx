import React from 'react';
import './AdminSideBar.css'; // asegúrate que el archivo en disco se llame exactamente AdminSideBar.css

export default function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">Kalpan</div>
            <nav className="sidebar-nav">
                <ul>
                    <li className="active">Usuarios</li>
                    <li>Dashboard</li>
                    <li>Publicar</li>
                </ul>
            </nav>
        </aside>
    );
}