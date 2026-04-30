# Changelog — SIGR

Registro de cambios incluidos en la **línea base** del repositorio hasta el commit vigente al cerrar esta versión del documento. Formato inspirado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [0.1.0] — Línea base AA2 (2026-04-29)

Estado del código y la documentación asociada al taller de **gestión de configuración** (Unidad 2). Rama: `main`.

### Añadido

- **Repositorio inicial** (`01e971a`): proyecto `sigr` en GitHub con `README.md`, licencia **MIT** (`LICENSE`) y rama `main`.
- **Documentación del taller y evidencias** (`77c01bc`): carpeta `docs/` con `Taller_LineaBase_SIGR.md` e imágenes en `docs/assets/` (creación del repo, URL de clonado, terminal `git clone`).
- **Front de pedidos (vanilla)** (`8974a80`):
  - `front/index.html`, `front/styles.css`, `front/script.js`.
  - Menú por categorías, búsqueda, carrito en modal, checkout (mesa / domicilio), resumen de pedido.
  - Persistencia local del carrito y del historial de pedidos confirmados (`localStorage`).
- **README del repositorio**: estructura del proyecto, instrucciones de clonado, ejecución del front, tabla de créditos de imágenes (Unsplash).
- **`LICENSE.txt`**: copia formal del texto de licencia para alinear el entregable con el enunciado del curso.
- **`CHANGELOG.md`**: este archivo.
- **`docs/DEPLOY.md`**: guía breve de despliegue del front estático.
- **`docs/DATABASE.md`**: nota sobre almacenamiento en esta línea base (sin motor SQL aún) y entidades previstas.
- **Cierre documentación 4.6 AA2** (`dbc4069`): inclusión de `CHANGELOG.md`, `LICENSE.txt`, actualización del informe `Taller_LineaBase_SIGR.md` y `README.md` con enlaces a los nuevos documentos.

### Alcance no incluido en esta línea base

- Backend, base de datos relacional, autenticación en servidor, reservas, caja y facturación (previstos como módulos futuros según el informe del taller).

---

## Referencia de commits (rama `main`)

| Commit (corto) | Commit (completo) | Mensaje |
|----------------|-------------------|---------|
| `01e971a` | `01e971a72995c86a5dd03305efe145d91d26593f` | Initial commit |
| `77c01bc` | `77c01bcecff75bd7680eed7225e7605866674b06` | Documentacion inicial |
| `8974a80` | `8974a804216942e7dc129f5d3936247365efe9ae` | Front inicial |
| `dbc4069` | `dbc4069a6a9d7dcbf9e8481187b4fec44430052d` | docs: CHANGELOG, LICENSE.txt, DEPLOY y DATABASE para línea base AA2 |
| `3fa2e4a` | `3fa2e4aabba320f84f227dcbb1077b3acac32c72` | docs: hash completo dbc4069 en CHANGELOG |

> *El enunciado genérico del curso puede citar un hash de ejemplo distinto (`a93b4f1`); la referencia real del equipo es la tabla anterior (último: `3fa2e4a`).*
