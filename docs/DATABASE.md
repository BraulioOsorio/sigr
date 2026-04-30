# Persistencia local — SIGR (`front/`)

## Situación

No hay motor de base de datos: toda la información vive en **`localStorage`** del navegador (demo académica). Los datos **no** se comparten entre dispositivos ni usuarios reales.

## Claves utilizadas

| Clave | Contenido |
|-------|-----------|
| `sigr_menu_v1` | Array JSON de platos (id, nombre, descripción, precio, categoría, imagen). Si falta, se usa el menú semilla del código. |
| `sigr_cart_v1` | Carrito activo: mapa `{ idPlato: { qty } }`. |
| `sigr_orders_v1` | Pedidos confirmados: cliente, ítems, total, mesa/domicilio, `status` (`pendiente` \| `en_preparacion` \| `listo` \| `entregado`), fechas. |
| `sigr_session_v1` | Sesión simulada: `name`, `role` (`cliente` \| `mesero` \| `administrador`), `at`. |
| `sigr_reservations_v1` | Reservas: nombre, fecha, hora, comensales, notas, id, `at`. |
| `sigr_cash_closures_v1` | Cierres de caja: `dateKey` (YYYY-MM-DD), `total`, `orderCount`, `closedAt`. |

## Limitaciones

Sin servidor no hay autenticación real ni concurrencia. Cualquiera con acceso al navegador puede ver o borrar datos desde las herramientas de desarrollo.

## Evolución futura

Un backend con base de datos relacional sustituiría estas claves por API y tablas normalizadas (usuarios, pedidos, reservas, cierres, etc.).
