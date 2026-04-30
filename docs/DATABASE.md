# Base de datos — estado en la línea base SIGR

## Situación actual

En la **línea base 0.1.0** no hay motor de base de datos (PostgreSQL, MySQL, etc.) ni scripts de migración versionados.

El prototipo de **pedidos en sala** (`front/`) persiste datos solo en el **almacenamiento local del navegador** mediante `localStorage`:

| Clave | Contenido |
|-------|-------------|
| `sigr_cart_v1` | Carrito activo (identificadores de plato y cantidades). |
| `sigr_orders_v1` | Lista de pedidos confirmados desde el formulario de checkout (JSON). |

Esto sirve para demostración y pruebas de interfaz; **no** sustituye a una base de datos transaccional ni cumple requisitos de seguridad o multiusuario.

## Modelo de datos previsto (fases posteriores)

Para alinear el desarrollo futuro con los módulos del enunciado (usuarios, reservas, caja, facturación), el equipo puede adoptar entidades conceptuales tales como:

- **Usuario** (rol: cliente, mesero, administrador).
- **Mesa** / **Reserva** (fecha, hora, estado).
- **Menú** (categoría, plato, precio, disponibilidad).
- **Pedido** y **línea de pedido** (cantidad, precio unitario aplicado).
- **Pago** / **cierre de caja** y **reporte** diario.

Cuando exista un esquema SQL o diagrama ER, este documento debe actualizarse con la versión del script y la fecha de la línea base correspondiente.
