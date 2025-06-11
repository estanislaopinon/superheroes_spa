# Superhéroes SPA

Una elegante aplicación de una sola página (SPA) para gestionar superhéroes de cómics de Marvel y DC, con soporte para filtrado por casa, carga de múltiples imágenes y persistencia de datos en MongoDB. Desarrollada con React, Express y Docker, ofrece una interfaz responsiva y moderna para explorar, crear, editar y eliminar perfiles de superhéroes.

## Requisitos

- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (para desarrollo local del frontend, opcional)

## Instalación

Sigue estos pasos para poner en marcha el proyecto:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/superheroes-spa.git
   cd superheroes-spa
   ```

2. **Configura las carpetas de imágenes**:

   - Crea las carpetas para la imagen predeterminada y las subidas:
     ```bash
     mkdir -p backend/images backend/uploads
     chmod -R 777 backend/uploads
     ```

3. **Inicia los contenedores**:

   ```bash
   docker-compose up --build -d
   ```

4. **(Opcional) Instala y ejecuta el frontend localmente**:

   - Si prefieres desarrollar sin Docker:
     ```bash
     cd frontend
     npm install
     npm start
     ```

5. **Verifica la conexión**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
   - MongoDB: `mongodb://localhost:27017`

## Uso

- **Accede al SPA**: Abre `http://localhost:3000` en tu navegador.
- **Explora superhéroes**: Navega por la lista de superhéroes en la página principal o filtra por casa en `/marvel` o `/dc`.
- **Añade un superhéroe**: Usa el formulario en `/create` para crear un nuevo personaje, con opción para subir hasta 10 imágenes (JPG/PNG, máx. 5MB).
- **Edita un superhéroe**: Ve a `/edit/:id` para actualizar detalles o gestionar imágenes (añadir, eliminar, incluyendo la predeterminada).
- **Detalles y carrusel**: Haz clic en una tarjeta para ver la biografía, equipo y un carrusel de imágenes en `/superhero/:id`.
- **Elimina un superhéroe**: Usa el botón "Eliminar" en la vista de detalle; las imágenes subidas se borran de `backend/uploads/`.

Para detener los contenedores:

```bash
docker-compose down
```
