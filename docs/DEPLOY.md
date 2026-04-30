# Manual de despliegue (línea base) — SIGR front

En esta línea base el producto entregable ejecutable es el **front estático** (`front/`). No hay servidor de aplicación propio del SIGR.

## Requisitos

- Navegador actualizado.
- Opcional: **Python 3** u otro servidor HTTP estático para servir la carpeta (evita restricciones CORS en algunos entornos al cargar recursos locales).

## Pasos

1. Clonar el repositorio (ver `README.md` en la raíz).
2. Entrar en la carpeta del front:

   ```bash
   cd front
   ```

3. **Opción A — Servidor local**

   ```bash
   python3 -m http.server 8080
   ```

   Abrir `http://127.0.0.1:8080`.

4. **Opción B — Abrir el archivo**

   Abrir `index.html` con el navegador. Las imágenes del menú requieren conexión a Internet (Unsplash).

## Despliegue público (opcional)

- **GitHub Pages:** publicar la carpeta `front/` como raíz del sitio o subruta, según la configuración del repositorio.
- Cualquier hosting de **sitios estáticos** (Netlify, Cloudflare Pages, etc.) puede apuntar al subdirectorio `front/` como directorio de publicación.

## Limitaciones de esta versión

- Los pedidos se guardan solo en el **navegador** (`localStorage`); no hay sincronización entre dispositivos ni con un backend.
