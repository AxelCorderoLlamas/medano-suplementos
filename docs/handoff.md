# Guia para la persona

## Que es esto

Es la web de Medano Suplementos con tienda, catalogo publico y panel privado para administrar productos y pedidos.

## Como se usa

- En la home se navega por secciones y se puede consultar por WhatsApp.
- En la tienda se agregan productos al carrito y se envia el pedido por email.
- En `/login` se entra al panel privado.
- En `/admin` se edita el catalogo y se miran los pedidos.

## Lo que puede hacer

- Crear productos nuevos.
- Editar nombre, marca, categoria, tipo, objetivos, sabores, etiquetas, imagen y texto.
- Subir imagenes sin tocar codigo.
- Mostrar u ocultar el precio.
- Revisar pedidos recientes.

## Lo que necesita para funcionar

- Clave admin.
- Variables de Vercel cargadas.
- Google reCAPTCHA configurado.
- Resend configurado para enviar pedidos.
- GitHub token para guardar catalogo, pedidos e imagenes.

## Si algo falla

- Si el login no entra, revisar la clave, el captcha y las variables de entorno.
- Si no se ven imagenes nuevas, revisar `GITHUB_TOKEN` y permisos del repo.
- Si no llegan pedidos por email, revisar `RESEND_API_KEY` y `ORDER_TO_EMAIL`.
- Si el catalogo no guarda, revisar `GITHUB_REPO` y `GITHUB_BRANCH`.

## Recomendaciones

- No tocar el JSON a mano si se puede evitar.
- Usar el admin para todo el contenido habitual.
- Revisar el sitio en celular antes de publicar cambios grandes.

## URL de trabajo

- Sitio publico: la URL de Vercel.
- Admin: `/admin`.
- Login: `/login`.

## Nota

- Todavia no hay dominio propio configurado.
- Cuando se tenga el dominio, hay que agregarlo en Google reCAPTCHA y en Vercel si corresponde.
