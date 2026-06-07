# Medano Suplementos

Sitio estatico para Medano Suplementos con catalogo, tienda, admin y envio de pedidos por email.

## Contenido

- Catalogo filtrable de productos.
- Tienda con carrito y checkout.
- Busqueda por texto.
- Recomendador rapido por objetivo.
- Panel admin con login en `/login` y dashboard en `/admin`.
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

## Admin

El panel admin usa autenticacion por cookie firmada.

Variables requeridas para login:

- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

Formato de `ADMIN_PASSWORD_HASH`:

- `scrypt$SALT_HEX$HASH_HEX`

Ejemplo para generar el hash con Node:

```bash
node -e "const crypto=require('crypto');const salt=crypto.randomBytes(16);const hash=crypto.scryptSync('TU_CLAVE_SEGURA',salt,32);console.log(`scrypt$${salt.toString('hex')}$${hash.toString('hex')}`)"
```

Para persistencia del catalogo y pedidos en GitHub:

- `GITHUB_TOKEN`
- `GITHUB_REPO`
- `GITHUB_BRANCH` (opcional, por defecto `main`)

El `GITHUB_TOKEN` necesita permisos de lectura y escritura sobre el repositorio.
