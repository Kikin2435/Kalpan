<<<<<<<< HEAD:frontend/README.md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
========
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
>>>>>>>> origin/Branch_Alejandro:README.md
