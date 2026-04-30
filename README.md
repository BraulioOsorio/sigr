# SIGR — Sistema integral de gestión de restaurante

Proyecto académico de **gestión de configuración** y producto software orientado a la operativa de un restaurante (pedidos, menú, reservas y documentación de línea base).

**Licencia:** MIT — ver [`LICENSE`](LICENSE).

---

## Tabla de contenidos

1. [Descripción](#descripción)
2. [Estructura del repositorio](#estructura-del-repositorio)
3. [Requisitos](#requisitos)
4. [Instalación y clonado](#instalación-y-clonado)
5. [Aplicación web de pedidos (`front/`)](#aplicación-web-de-pedidos-front)
6. [Documentación del taller](#documentación-del-taller)
7. [Control de versiones](#control-de-versiones)
8. [Roadmap sugerido](#roadmap-sugerido)

---

## Descripción

**SIGR** agrupa:

- **Documentación de línea base** y evidencias del curso (`docs/`).
- **Front SIGR** en HTML, CSS y JavaScript **vanilla** (sin frameworks): cinco módulos de demostración con datos en **`localStorage`** (sin backend).

El nombre del repositorio en GitHub es **`sigr`** (mismo acrónimo que SIGR).

**Demostración en línea (front):** [https://sigr.onrender.com/](https://sigr.onrender.com/) — sitio estático en [Render](https://render.com/) enlazado al repo; detalles en [`docs/DEPLOY.md`](docs/DEPLOY.md).

---

## Estructura del repositorio

```
sigr/
├── LICENSE                 # Licencia MIT
├── README.md               # Este archivo
├── CHANGELOG.md            # Historial de cambios hasta la línea base
├── docs/
│   ├── Taller_LineaBase_SIGR.md   # Informe del taller (exportable a PDF)
│   ├── DEPLOY.md                  # Despliegue del front estático
│   ├── DATABASE.md                # Estado de datos (localStorage / modelo futuro)
│   └── assets/                    # Capturas para la documentación
│       ├── 01-creacion-repositorio-github.png
│       ├── 02-repositorio-clone-https.png
│       ├── 03-terminal-git-clone.png
│       ├── 04-render-config-static-site.png
│       └── 05-render-deploy-live.png
└── front/                  # Aplicación web estática de pedidos
    ├── index.html          # Marcado y regiones principales (menú, carrito, modales)
    ├── styles.css          # Estilos responsive y tema visual
    └── script.js           # Datos del menú, estado del carrito, localStorage, UI
```

| Ruta | Propósito |
|------|-----------|
| `docs/Taller_LineaBase_SIGR.md` | Contenido del **AA2** (introducción, objetivos, versionado Git, criterios de línea base, validación). |
| `docs/DEPLOY.md` | Manual de despliegue del front estático. |
| `docs/DATABASE.md` | Estado de persistencia y modelo de datos previsto. |
| `docs/assets/*.png` | Evidencias gráficas (creación del repo, clonado, terminal). |
| `CHANGELOG.md` | Historial de cambios hasta la línea base (`0.1.0`). |
| `LICENSE` | Licencia MIT (texto duplicado por requisito de enunciado). |
| `front/index.html` | Punto de entrada del navegador; enlaza `styles.css` y `script.js`. |
| `front/styles.css` | Layout (rejilla de platos hasta 3 columnas, carrito en modal, modales), tipografías y animaciones. |
| `front/script.js` | Menú (semilla + CRUD), carrito, pedidos y estados, sesión por rol, reservas, cierres de caja y navegación entre vistas. |

---

## Requisitos

- **Git** (para clonar y versionar).
- **Navegador moderno** (Chrome, Firefox, Edge o Safari recientes).
- **Python 3** *(opcional)* solo si quieres servir `front/` con un servidor local en lugar de abrir el HTML a pelo.

No hace falta Node.js ni gestor de paquetes para ejecutar el front.

---

## Instalación y clonado

```bash
git clone https://github.com/BraulioOsorio/sigr.git
cd sigr
```

Comprobar el estado del repositorio:

```bash
git status
git log --oneline -5
```

---

## Aplicación web (`front/`)

Interfaz tipo **app de restaurante** con pestañas de módulos. Todo el estado vive en el navegador (`localStorage`); no hay servidor ni base de datos.

**Módulos incluidos (prototipo local)**

1. **Pedidos** — Tarjetas de platos (foto, precio, categoría), carrito en modal, checkout (mesa o domicilio), resumen al confirmar.
2. **Sesión** — Nombre y rol simulados (*cliente*, *mesero*, *administrador*); sin contraseña.
3. **Menú CRUD** — Alta, edición y borrado de platos y categorías; restaurar menú semilla.
4. **Pedidos en vivo** — Tabla de pedidos confirmados y cambio de estado (*pendiente → en preparación → listo → entregado*); botón *Actualizar* (no hay WebSocket).
5. **Reservas** — Fecha, hora, comensales y notas; listado y borrado local.
6. **Caja** — Total del día por calendario y registro de **cierres** como instantánea en almacenamiento local.

### Cómo ejecutarla

**Opción A — Servidor local (recomendado)**

```bash
cd front
python3 -m http.server 8080
```

Abre en el navegador: `http://127.0.0.1:8080`

**Producción (Render):** [https://sigr.onrender.com/](https://sigr.onrender.com/) — misma app servida desde la carpeta `front/` del repo (ver [`docs/DEPLOY.md`](docs/DEPLOY.md)).

**Opción B — Archivo directo**

Abre `front/index.html` con el navegador (doble clic o *Abrir con*). Las imágenes del menú se cargan desde **Internet** (Unsplash); hace falta conexión.

### Stack técnico

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 semántico (`header`, `main`, `section`, `aside`, `dialog` vía overlay) |
| Estilo | CSS3 (variables, grid, flexbox, `clamp`, animaciones, media queries) |
| Lógica | JavaScript ES6+ en un solo módulo (`script.js`), sin bundler |

### Funcionalidades principales

- Navegación por **vistas** (Pedidos, Sesión, Menú CRUD, Pedidos en vivo, Reservas, Caja).
- Menú inicial desde **`MENU_SEED`** en `front/script.js`; el usuario puede modificarlo desde **Menú CRUD** o volver a la semilla.
- Fotografías por **URL** (por defecto Unsplash con parámetros de recorte).
- Carrito, filtros por categoría, búsqueda y checkout como antes.
- **`localStorage`**: ver tabla en [`docs/DATABASE.md`](docs/DATABASE.md) (`sigr_menu_v1`, `sigr_cart_v1`, `sigr_orders_v1`, `sigr_session_v1`, `sigr_reservations_v1`, `sigr_cash_closures_v1`).

### Personalización rápida

- **Menú semilla y platos por defecto:** constante `MENU_SEED` en `front/script.js`.
- **Colores y tipografía:** variables `:root` en `front/styles.css`.
- **Textos legales / marca:** `front/index.html` (cabecera y títulos de modales).

---

## Documentación del taller

El informe del **AA2** (línea base, criterios, Git) para **Gestión del software** está en:

**[`docs/Taller_LineaBase_SIGR.md`](docs/Taller_LineaBase_SIGR.md)**

Desde ahí puedes exportar a **PDF** (por ejemplo con Pandoc, Word o *Imprimir → Guardar como PDF*) siguiendo el nombre indicado por el curso: `Taller_LineaBase_SIGR.pdf`.

Otros documentos del entregable: [`CHANGELOG.md`](CHANGELOG.md), [`docs/DEPLOY.md`](docs/DEPLOY.md), [`docs/DATABASE.md`](docs/DATABASE.md).

---

## Control de versiones

- **Remoto:** GitHub — repositorio `BraulioOsorio/sigr`.
- **Rama principal:** `main`.

Los hitos relevantes (commit inicial, documentación, front) se reflejan en el historial de `git log`.

---

## Roadmap sugerido

Siguiente salto de calidad (fuera del alcance de este prototipo estático):

- API backend, base de datos y autenticación real.
- Pedidos y reservas **multiusuario** y tiempo real (WebSockets o similar).
- Caja auditada en servidor, informes y facturación electrónica.
- Pipeline CI (por ejemplo GitHub Actions) cuando el equipo lo defina.

---

## Créditos de imagen (menú)

Las fotografías se cargan desde [Unsplash](https://unsplash.com/) (`images.unsplash.com`). En `front/script.js`, la función `foodPhoto()` aplica `auto=format`, `fit=crop`, `w=960`, `h=720` y `q=88` para buena nitidez en pantallas Retina sin pesar de más.

| Plato | ID de foto (Unsplash) |
|-------|------------------------|
| Bruschetta al pomodoro | `photo-1544025162-d76694265947` |
| Ensalada César | `photo-1546793665-c74683f339c1` |
| Pasta carbonara | `photo-1621996346565-e3dbc646d9a9` |
| Salmón a la plancha | `photo-1467003909585-2f8a72700288` |
| Risotto de setas | `photo-1563379926898-05f4575a45d8` |
| Hamburguesa SIGR | `photo-1550547660-d9450f859349` |
| Limonada casera | `photo-1559339352-11d035aa65de` |
| Copa de vino tinto | `photo-1510812431401-41d2bd2722f3` |
| Café espresso | `photo-1509042239860-f550ce710b93` |
| Tiramisú | `photo-1571877227200-a0d98ea607e9` |
| Cheesecake de frutos rojos | `photo-1488477181946-6428a0291777` |
| Helado artesanal | `photo-1563805042-7684c019e1cb` |

Si tienes dudas sobre el taller o el despliegue, revisa con tu equipo y el material de la **Unidad 2 — Gestión de la configuración**.
