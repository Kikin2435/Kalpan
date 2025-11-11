# Kalpan - Plataforma de Alojamiento para Estudiantes

Proyecto dividido en frontend (React) y backend (Express + MySQL).

## Estructura del Proyecto

```
Kalpan-frontend/
├── frontend/          # Aplicación React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/           # API Express
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md          # Este archivo
```

## Requisitos

- Node.js (versión 16 o superior)
- MySQL (servidor corriendo)
- npm o yarn

## Instalación y Ejecución

### Backend (API)

1. Navega a la carpeta backend:
```powershell
cd backend
```

2. Instala las dependencias:
```powershell
npm install
```

3. Configura la base de datos en `backend/src/config/database.js` si es necesario

4. Ejecuta el servidor:
```powershell
npm run dev
```

El backend estará disponible en: `http://localhost:4000`

### Frontend (React)

1. Abre una **nueva terminal** y navega a la carpeta frontend:
```powershell
cd frontend
```

2. Instala las dependencias:
```powershell
npm install
```

3. Ejecuta la aplicación:
```powershell
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## Características Principales

- **Registro de Usuarios**: Estudiantes y Propietarios pueden registrarse seleccionando su rol
- **Inicio de Sesión**: Autenticación de usuarios
- **Publicar Alojamiento**: Los propietarios pueden publicar propiedades
- **Buscar Alojamiento**: Los estudiantes pueden buscar y filtrar alojamientos
- **Editar Alojamiento**: Modificar propiedades existentes

## Tecnologías Utilizadas

### Frontend
- React 19
- React Router DOM
- Material-UI (MUI)
- React Icons
- CSS Modules

### Backend
- Express 5
- Sequelize (ORM)
- MySQL2
- bcrypt (encriptación de contraseñas)
- CORS
- Nodemon (desarrollo)

## Scripts Disponibles

### Frontend
- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Crea una build de producción
- `npm test` - Ejecuta las pruebas

### Backend
- `npm run dev` - Inicia el servidor con nodemon (auto-reload)
- `npm test` - Ejecuta las pruebas con Jest
- `npm run test:coverage` - Ejecuta las pruebas con reporte de cobertura

## Solución de Problemas

### Error de ejecución de scripts en PowerShell
Si obtienes un error sobre políticas de ejecución, ejecuta:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Puerto ya en uso
Si el puerto 3000 o 4000 está en uso, puedes:
1. Cerrar la aplicación que lo está usando
2. O cambiar el puerto en la configuración

### Problemas de CORS
Asegúrate de que el backend esté corriendo antes de iniciar el frontend. El frontend está configurado para hacer peticiones a `http://localhost:4000`.

## Contribuciones

Este proyecto es parte de un trabajo universitario para la asignatura de Programación Móvil.
