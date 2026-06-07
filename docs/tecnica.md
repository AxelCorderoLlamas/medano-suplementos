# Documentacion tecnica

## Resumen

Medano Suplementos es un sitio estatico desplegado en Vercel con frontend HTML, CSS y JavaScript, y un conjunto de funciones serverless en `api/` para pedidos, autenticacion admin, catalogo e imagenes.

## Estructura

- `index.html`: sitio publico.
- `login.html`: acceso al panel admin.
- `admin.html`: panel de gestion de catalogo y pedidos.
- `script.js`: logica del sitio publico, carrito, catalogo y checkout.
- `login.js`: logica del login admin.
- `admin.js`: logica del panel admin.
- `styles.css`: estilos globales y del admin.
- `api/`: endpoints serverless.
- `lib/`: helpers compartidos.
- `data/`: persistencia JSON del catalogo y pedidos.
- `assets/`: logos e imagenes subidas.

## Flujos

- El sitio publico carga el catalogo desde `GET /api/catalog`.
- El checkout envia pedidos a `POST /api/order`.
- El login admin usa `POST /api/auth/login`.
- La sesion se valida con `GET /api/auth/session`.
- El panel admin carga y guarda catalogo en `GET /api/catalog` y `PUT /api/catalog`.
- Los pedidos del panel salen de `GET /api/orders`.
- La subida de imagenes usa `POST /api/upload-image`.

## Persistencia

- El catalogo se guarda en `data/catalog.json`.
- Los pedidos se guardan en `data/orders.json`.
- Si `GITHUB_TOKEN` y `GITHUB_REPO` estan configurados, el sistema usa GitHub como store remoto para leer y escribir esos JSON.
- Las imagenes subidas desde el admin se guardan en `assets/uploads/`.

## Variables de entorno

- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`
- `RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `RESEND_API_KEY`
- `ORDER_TO_EMAIL`
- `ORDER_FROM_EMAIL`
- `GITHUB_TOKEN`
- `GITHUB_REPO`
- `GITHUB_BRANCH`

## Seguridad

- La sesion admin usa cookie `HttpOnly`, `SameSite=Strict` y `Secure` en produccion.
- La clave admin se guarda como hash `scrypt`.
- El login tiene rate limit y bloqueo temporal por IP.
- El checkout tiene rate limit y honeypot anti-spam.
- El login admin exige Google reCAPTCHA v2 checkbox.
- El render publico escapa HTML dinamico y limita URLs de imagen a HTTP/HTTPS.
- El sitio aplica headers de seguridad en `vercel.json`.

## Requisitos de Google reCAPTCHA

- Usar reCAPTCHA v2 checkbox.
- Registrar los dominios reales del sitio.
- Cargar la `site key` en Vercel como `RECAPTCHA_SITE_KEY`.
- Cargar la `secret key` en Vercel como `RECAPTCHA_SECRET_KEY`.

## Deploy

- Preset en Vercel: `Other`
- Build command: vacio
- Output directory: `.`
- El deploy debe salir desde `main`.

## Observaciones

- El bloqueo temporal del login vive en memoria de la instancia serverless.
- Si queres persistencia real del bloqueo, hace falta Redis, KV o una base.
- Si el repo queda publico, las URLs `raw.githubusercontent.com` de imagenes siguen siendo accesibles solo si el contenido es publico.
