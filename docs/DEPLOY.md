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

## Despliegue público

### Instancia en Render (activa)

El front está publicado como **sitio estático** en Render:

**URL pública:** [https://sigr.onrender.com/](https://sigr.onrender.com/)

| Parámetro | Valor recomendado |
|-----------|-------------------|
| Repositorio | `BraulioOsorio/sigr` (GitHub) |
| Rama | `main` |
| **Root Directory** | **`front`** *(obligatorio: el `index.html` del pedido está dentro de `front/`; si se deja vacío, el sitio no servirá la app correctamente)* |
| Build Command | *(vacío — no hay paso de build)* |
| Publish directory | *(según Render: con root `front`, los archivos publicados son los de esa carpeta)* |

Tras cada `git push` a `main`, Render puede redesplegar automáticamente el sitio (según tengáis activados los despliegues automáticos).

### Otras plataformas (opcional)

- **GitHub Pages:** publicar la carpeta `front/` como raíz del sitio o subruta.
- **Netlify, Cloudflare Pages, etc.:** mismo criterio: directorio de publicación = **`front/`**.

## Limitaciones de esta versión

- Los pedidos se guardan solo en el **navegador** (`localStorage`); no hay sincronización entre dispositivos ni con un backend.
