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

*En la versión actual del repositorio solo está inicializado el proyecto (README, licencia); los módulos anteriores constituyen el alcance acordado para evolucionar sobre esta línea base.*

### 4.3. Versionado del código

| Concepto | Valor |
|----------|--------|
| **Herramienta** | Git |
| **Repositorio oficial** | https://github.com/BraulioOsorio/sigr |
| **Rama principal estable** | `main` |
| **Commit inicial (GitHub)** | `01e971a72995c86a5dd03305efe145d91d26593f` — *Initial commit* |
| **Commit con documentación e imágenes del taller** | `77c01bcecff75bd7680eed7225e7605866674b06` — *Documentacion inicial* (`docs/assets/`, capturas del proceso) |

*Si el enunciado del curso cita un hash de ejemplo distinto, mantener esta tabla como referencia real del repositorio del equipo.*

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

### 4.4. Criterios para establecer la línea base

- Los módulos iniciales previstos **compilan / ejecutan** según vaya incorporándose el código *(pendiente de ampliar cuando exista build)*.
- Las **funcionalidades críticas** acordadas con el tutor quedan operativas y validadas en el hito declarado.
- **Pruebas básicas** de integración completadas para ese hito.
- **Estructura de carpetas** y convenciones de código definidas por el equipo.
- **Documentación técnica mínima:** README, esquema o notas de base de datos, manual de despliegue *(ir completando en commits posteriores)*.

### 4.5. Herramientas de soporte

- **GitHub:** control de versiones y colaboración.
- **GitHub Issues:** seguimiento de mejoras y errores *(activar en el repo si el equipo lo usa)*.
- **Jenkins** *(opcional)* para integración continua futura.

### 4.6. Documentación asociada

| Artefacto | Estado |
|-----------|--------|
| `README.md` | Incluido — instrucciones de clonado ampliadas en este taller y en el propio README del repo si se actualiza. |
| `CHANGELOG.md` | *[Añadir en el repo y resumir aquí los cambios hasta la línea base]* |
| `LICENSE` / licencia MIT | Incluido en el repositorio (equivalente a `LICENSE.txt` del enunciado). |

### 4.7. Validación y aprobación de la línea base

| Campo | Valor |
|--------|--------|
| **Fecha de creación** | *[dd/mm/aaaa]* |
| **Validado por** | Grupo de desarrollo |
| **Responsable de aprobación** | *[Coordinador del equipo o rol designado]* |

---

## Referencias de archivos en este entregable

- Documento fuente: `docs/Taller_LineaBase_SIGR.md`
- Imágenes: `docs/assets/01-creacion-repositorio-github.png`, `02-repositorio-clone-https.png`, `03-terminal-git-clone.png`
