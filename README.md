# Medano Suplementos

Sitio estatico para Medano Suplementos con catalogo, tienda y envio de pedidos por email.

## Contenido

- Catalogo filtrable de productos.
- Tienda con carrito y checkout.
- Busqueda por texto.
- Recomendador rapido por objetivo.
- Contacto por Instagram y WhatsApp.

## Deploy

Este proyecto es estatico. En Vercel se puede importar el repositorio y usar:

- Framework Preset: `Other`
- Build Command: vacio
- Output Directory: `.`

## Email de pedidos

La tienda usa la ruta `/api/order` para enviar pedidos con Resend.

Variables de entorno requeridas en Vercel:

- `RESEND_API_KEY`
- `ORDER_TO_EMAIL`

Variable opcional:

- `ORDER_FROM_EMAIL`

Si no se define `ORDER_FROM_EMAIL`, la funcion usa `Medano Suplementos <onboarding@resend.dev>` como remitente por defecto.
