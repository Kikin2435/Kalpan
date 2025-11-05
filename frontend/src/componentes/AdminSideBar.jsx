// src/components/AdminSidebar.jsx
import React from "react";
import "./AdminSidebar.css"; // aquí pones su estilo

function AdminSidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>KALPAN</h2>
            </div>

            <nav className="sidebar-menu">
                <a href="/admin/dashboard">Dashboard</a>
                <a href="/admin/usuarios">Usuarios</a>
                <a href="/admin/visitas">Visitas</a>
                <a href="/admin/config">Configuración</a>
            </nav>
        </aside>
    );
}

export default AdminSidebar;
