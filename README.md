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
- **Front de pedidos** en HTML, CSS y JavaScript **vanilla** (sin frameworks): menú por categorías, carrito, checkout y persistencia local.

El nombre del repositorio en GitHub es **`sigr`** (mismo acrónimo que SIGR).

---

## Estructura del repositorio

```
sigr/
├── LICENSE                 # Licencia MIT
├── README.md               # Este archivo
├── docs/
│   ├── Taller_LineaBase_SIGR.md   # Informe del taller (exportable a PDF)
│   └── assets/                    # Capturas para la documentación
│       ├── 01-creacion-repositorio-github.png
│       ├── 02-repositorio-clone-https.png
│       └── 03-terminal-git-clone.png
└── front/                  # Aplicación web estática de pedidos
    ├── index.html          # Marcado y regiones principales (menú, carrito, modales)
    ├── styles.css          # Estilos responsive y tema visual
    └── script.js           # Datos del menú, estado del carrito, localStorage, UI
```

| Ruta | Propósito |
|------|-----------|
| `docs/Taller_LineaBase_SIGR.md` | Contenido del **AA2** (introducción, objetivos, versionado Git, criterios de línea base, validación). |
| `docs/assets/*.png` | Evidencias gráficas (creación del repo, clonado, terminal). |
| `front/index.html` | Punto de entrada del navegador; enlaza `styles.css` y `script.js`. |
| `front/styles.css` | Layout (rejilla de platos hasta 3 columnas, carrito en modal, modales), tipografías y animaciones. |
| `front/script.js` | Modelo de datos del menú (~12 platos), lógica del carrito, filtros, búsqueda y pedidos. |

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

## Aplicación web de pedidos (`front/`)

Interfaz tipo **app de restaurante**: tarjetas con foto, nombre, descripción, precio y categoría (hasta **tres columnas** en pantallas anchas); **icono de carrito** arriba a la derecha que abre un **modal** para revisar líneas, cambiar cantidades o quitar productos y **Continuar** al checkout; formulario de cliente (mesa o domicilio); resumen al confirmar.

### Cómo ejecutarla

**Opción A — Servidor local (recomendado)**

```bash
cd front
python3 -m http.server 8080
```

Abre en el navegador: `http://127.0.0.1:8080`

**Opción B — Archivo directo**

Abre `front/index.html` con el navegador (doble clic o *Abrir con*). Las imágenes del menú se cargan desde **Internet** (Unsplash); hace falta conexión.

### Stack técnico

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 semántico (`header`, `main`, `section`, `aside`, `dialog` vía overlay) |
| Estilo | CSS3 (variables, grid, flexbox, `clamp`, animaciones, media queries) |
| Lógica | JavaScript ES6+ en un solo módulo (`script.js`), sin bundler |

### Funcionalidades principales

- Listado de **12 platos** en categorías: Entradas, Platos fuertes, Bebidas, Postres.
- Fotografías de **alta calidad** (URLs públicas Unsplash, formato optimizado `auto=format&fit=crop`).
- **Agregar al pedido**, contador en tarjeta y total dinámico.
- Carrito: **aumentar / disminuir** cantidad, **eliminar** línea.
- **Filtro** por categoría y **búsqueda** por texto en nombre y descripción.
- Checkout: nombre del cliente, **mesa** o **dirección** según tipo de servicio.
- **Resumen** del pedido tras confirmar.
- **`localStorage`**: clave `sigr_cart_v1` (carrito) y `sigr_orders_v1` (historial de pedidos confirmados).

### Personalización rápida

- **Menú y precios:** edita el array `MENU` en `front/script.js`.
- **Colores y tipografía:** variables `:root` en `front/styles.css`.
- **Textos legales / marca:** `front/index.html` (cabecera y títulos de modales).

---

## Documentación del taller

El informe grupal para la asignatura **Gestión del software** (línea base, criterios, Git) está en:

**[`docs/Taller_LineaBase_SIGR.md`](docs/Taller_LineaBase_SIGR.md)**

Desde ahí puedes exportar a **PDF** (por ejemplo con Pandoc, Word o *Imprimir → Guardar como PDF*) siguiendo el nombre indicado por el curso: `Taller_LineaBase_SIGR.pdf`.

---

## Control de versiones

- **Remoto:** GitHub — repositorio `BraulioOsorio/sigr`.
- **Rama principal:** `main`.

Los hitos relevantes (commit inicial, documentación, front) se reflejan en el historial de `git log`.

---

## Roadmap sugerido

Ideas alineadas con el enunciado del SIGR (no implementadas aún en este repo):

- API backend y base de datos (pedidos persistentes en servidor).
- Roles: cliente, mesero, administrador.
- Módulo de **reservas** y de **reportes** / caja.
- `CHANGELOG.md` y pipeline CI (por ejemplo GitHub Actions) cuando el equipo lo defina en la línea base.

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
