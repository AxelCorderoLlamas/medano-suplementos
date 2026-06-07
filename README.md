# Medano Suplementos

Sitio estatico para Medano Suplementos con catalogo, tienda, admin y envio de pedidos por email.

## Contenido

- Catalogo filtrable de productos.
- Tienda con carrito y checkout.
- Busqueda por texto.
- Recomendador rapido por objetivo.
- Panel admin con login en `/login` y dashboard en `/admin`.
- Contacto por Instagram y WhatsApp.

## Documentacion

- [Documentacion funcional](docs/funcional.md)
- [Documentacion funcional PDF](docs/funcional.pdf)
- [Documentacion tecnica](docs/tecnica.md)
- [Guia para la persona](docs/handoff.md)

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
- `RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

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

Para Google reCAPTCHA:

- usar reCAPTCHA v2 checkbox
- agregar el dominio de produccion en la consola de reCAPTCHA
- si queres probar en local, habilitar `localhost` en esa clave o usar una clave separada de desarrollo

## Imagenes del catalogo

Desde el admin se pueden subir imagenes directamente. El archivo se guarda en el repositorio dentro de `assets/uploads/` y el sistema usa la URL final automaticamente.
