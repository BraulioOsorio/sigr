# Taller grupal — Línea base software de restaurante (SIGR)

> **Uso del documento:** este Markdown sirve como borrador para generar el PDF final `Taller_LineaBase_SIGR.pdf` (exportar con Pandoc, Word, o imprimir desde el visor). Las imágenes están en `docs/assets/` dentro del repositorio.

---

## 1. Portada *(trasladar al PDF con formato de portada)*

| Campo | Contenido |
|--------|-----------|
| **Título** | AA2 — Taller grupal: línea base software de restaurante (SIGR) |
| **Integrantes** | *[Nombres completos del grupo, máx. 3]* |
| **Asignatura** | Gestión del software |
| **Programa** | Ingeniería de software |
| **Unidad** | 2 — Gestión de la configuración |
| **Actividad** | AA2 |
| **Fecha de entrega** | *[dd/mm/aaaa]* |
| **Tutor / datos adicionales** | *[Si el curso lo exige en la rúbrica]* |

---

## 2. Introducción

El **Sistema integral de gestión de restaurante (SIGR)** es una aplicación web orientada a la operativa del negocio: pedidos, reservas, menús, usuarios, reportes y facturación. En etapas tempranas del desarrollo, fijar una **línea base** del código fuente permite marcar un hito estable: a partir de ese punto se controlan los cambios, se gana **trazabilidad** y se reduce el riesgo de que el producto “derivé” sin un referente común para el equipo y la asignatura.

---

## 3. Objetivo del taller

Describir el **primer hito de estabilidad** del SIGR en términos funcionales y técnicos, alineado con la **gestión de configuración** y el **control de versiones** (Git / GitHub). Se refuerza la **documentación técnica** y la **planificación de versiones** como base para mejoras y validaciones posteriores.

---

## 4. Contenido técnico

### 4.1. Descripción del proyecto

- **Nombre del sistema:** SIGR — Sistema integral de gestión de restaurante.
- **Descripción breve:** aplicación web para gestionar pedidos, reservas, administración de menús, control de caja y generación de reportes *(alcance previsto del producto; el repositorio actual recoge el inicio del proyecto y la documentación de línea base)*.

### 4.2. Componentes incluidos en la línea base *(plan / módulos previstos)*

- Módulo de **autenticación** de usuarios (clientes, meseros, administrador).
- Módulo de **menú digital** con CRUD de platos y categorías.
- Módulo de **pedidos** en tiempo real.
- Módulo de **reservas** por fecha y hora.
- Módulo de **cierre de caja** y reportes de ventas diarios.

*En la versión actual del repositorio existe un **prototipo de pedidos en sala** (`front/`: menú, carrito, checkout y `localStorage`). El resto de módulos (autenticación en servidor, CRUD de menú en backend, reservas, caja, reportes y facturación) constituyen el **alcance previsto** para iteraciones posteriores sobre esta línea base.*

### 4.3. Versionado del código

| Concepto | Valor |
|----------|--------|
| **Herramienta** | Git |
| **Repositorio oficial** | https://github.com/BraulioOsorio/sigr |
| **Rama principal estable** | `main` |
| **Commit inicial (GitHub)** | `01e971a72995c86a5dd03305efe145d91d26593f` — *Initial commit* |
| **Commit con documentación e imágenes del taller** | `77c01bcecff75bd7680eed7225e7605866674b06` — *Documentacion inicial* (`docs/assets/`, capturas del proceso) |
| **Commit con front de pedidos y README ampliado** | `8974a804216942e7dc129f5d3936247365efe9ae` — *Front inicial* (`front/`, documentación operativa) |
| **Último commit de la línea base documentada** | `3fa2e4aabba320f84f227dcbb1077b3acac32c72` — *docs: hash completo dbc4069 en CHANGELOG* (incluye `CHANGELOG.md`, `LICENSE.txt`, `docs/DEPLOY.md`, `docs/DATABASE.md` vía `dbc4069`) |

*El enunciado genérico puede citar el hash de ejemplo `a93b4f1`; la referencia real del equipo es la tabla anterior (rango útil: desde `01e971a` hasta el HEAD indicado).*

#### 4.3.1. Creación del repositorio en GitHub

Se creó el repositorio público **`sigr`** bajo el usuario **BraulioOsorio**, con descripción *Tarea Restaurante*, **README** inicial y licencia **MIT**, según los requisitos del taller.

![Creación del repositorio en GitHub (nombre, descripción, README y MIT)](assets/01-creacion-repositorio-github.png)

#### 4.3.2. URL HTTPS para clonar

En la página del repositorio, pestaña *Code*, método **HTTPS**: `https://github.com/BraulioOsorio/sigr.git`.

![Repositorio en GitHub: rama main y URL de clonado HTTPS](assets/02-repositorio-clone-https.png)

#### 4.3.3. Clonado en el equipo local

Para trabajar en el ordenador personal, se clona el repositorio en una carpeta de trabajo (en este caso el directorio principal de proyecto usado fue `~/Oceanic`).

**Comando ejecutado:**

```bash
git clone https://github.com/BraulioOsorio/sigr.git
```

**Salida esperada:** Git descarga los objetos del remoto y crea la carpeta `sigr` con el historial de la rama `main`.

![Terminal: clonado correcto del repositorio sigr](assets/03-terminal-git-clone.png)

**Pasos resumidos:**

1. Instalar Git si no está disponible en el sistema.
2. Abrir una terminal en la carpeta donde se desee el proyecto (por ejemplo `~/Oceanic`).
3. Ejecutar `git clone` con la URL HTTPS del repositorio.
4. Entrar en el proyecto: `cd sigr` y comprobar con `git status` y `git log`.

#### 4.3.4. Registro de cambios: añadir documentación y subirla al remoto

Tras añadir la carpeta `docs/` con material del taller (en el commit registrado, las capturas bajo `docs/assets/`), se versionó y se publicó en GitHub con la siguiente secuencia *(desde el directorio del proyecto `sigr`)*:

1. **Comprobar el estado del repositorio**

   ```bash
   git status
   ```

   Resultado: rama `main`, al día con `origin/main`, y la carpeta `docs/` como archivos sin seguimiento (*untracked*).

2. **Incluir todos los archivos nuevos o modificados en el área de preparación (*staging*)**

   ```bash
   git add .
   ```

3. **Crear el commit con un mensaje descriptivo**

   ```bash
   git commit -m "Documentacion inicial"
   ```

   Se generó el commit **`77c01bcecff75bd7680eed7225e7605866674b06`** en `main`, incorporando los archivos nuevos de `docs/assets/` (capturas del repositorio y del clonado).

4. **Enviar los commits al repositorio remoto**

   ```bash
   git push
   ```

   La rama `main` local quedó sincronizada con `origin/main` (actualización `01e971a..77c01bc` en GitHub).

Con esto queda **trazabilidad** en el historial de Git de la primera subida de documentación asociada a la línea base del taller.

#### 4.3.5. Despliegue público (Render)

El prototipo de pedidos quedó alojado como **sitio estático** en Render, con URL pública:

**[https://sigr.onrender.com/](https://sigr.onrender.com/)**

Repositorio conectado: `BraulioOsorio/sigr`, rama `main`. En la configuración del servicio, el **root directory** debe ser la carpeta **`front`** para que el documento raíz sea `index.html` del cliente y carguen `styles.css` y `script.js` con rutas relativas correctas.

![Configuración del sitio estático en Render (repo, rama, nombre sigr)](assets/04-render-config-static-site.png)

![Despliegue correcto en Render (sitio activo)](assets/05-render-deploy-live.png)

### 4.4. Criterios para establecer la línea base

- **Ejecución del front:** el prototipo en `front/` se ejecuta en navegador (local o **producción** en [https://sigr.onrender.com/](https://sigr.onrender.com/)) sin errores de consola en flujos básicos (menú, carrito, checkout, resumen).
- **Funcionalidades críticas del hito:** toma de pedido de demostración operativa; el resto de módulos del SIGR permanecen planificados *(validación formal con el tutor según criterio del curso)*.
- **Pruebas:** pruebas manuales de recorrido (*smoke*) sobre el front; sin suite automatizada en esta línea base.
- **Estructura de carpetas:** `docs/` (taller, despliegue, notas de datos), `front/` (HTML/CSS/JS), raíz (`README`, `LICENSE`, `CHANGELOG`).
- **Documentación técnica mínima:** `README.md`, `docs/DATABASE.md` (estado de persistencia y modelo previsto), `docs/DEPLOY.md` (despliegue local y **URL pública Render**).

### 4.5. Herramientas de soporte

- **GitHub:** control de versiones y colaboración.
- **Render:** alojamiento del front como sitio estático (demostración: [https://sigr.onrender.com/](https://sigr.onrender.com/)).
- **GitHub Issues:** seguimiento de mejoras y errores *(activar en el repo si el equipo lo usa)*.
- **Jenkins** *(opcional)* para integración continua futura.

### 4.6. Documentación asociada

| Artefacto | Estado |
|-----------|--------|
| `README.md` | Incluido — clonado, estructura, ejecución del front, créditos de imágenes. |
| `CHANGELOG.md` | Incluido — historial hasta la línea base `0.1.0` con commits referenciados. |
| `LICENSE` y `LICENSE.txt` | MIT — mismo texto (el enunciado nombra `LICENSE.txt`). |
| `docs/DEPLOY.md` | Manual breve de despliegue del front estático. |
| `docs/DATABASE.md` | Notas sobre `localStorage` y modelo de datos futuro. |

### 4.7. Validación y aprobación de la línea base

| Campo | Valor |
|--------|--------|
| **Fecha de creación** | 29/04/2026 *(fecha de cierre de documentación de esta versión; ajustar si el equipo acuerda otra)* |
| **Validado por** | Grupo de desarrollo |
| **Responsable de aprobación** | *[Coordinador del equipo o rol designado]* |

---

## Referencias de archivos en este entregable

- Documento fuente: `docs/Taller_LineaBase_SIGR.md`
- Imágenes: `docs/assets/01-creacion-repositorio-github.png`, `02-repositorio-clone-https.png`, `03-terminal-git-clone.png`, `04-render-config-static-site.png`, `05-render-deploy-live.png`
- Cambios versionados: `CHANGELOG.md`
- Despliegue y datos: `docs/DEPLOY.md`, `docs/DATABASE.md`
