# Documentacion funcional

## Sitio publico

- Muestra un hero inicial con llamados a la accion.
- Tiene secciones de tienda, catalogo, ofertas, combos, recomendador y contacto.
- Permite buscar y filtrar productos por categoria, marca y sabor.
- Cada producto abre un detalle con descripcion, uso, combinaciones y link a WhatsApp.
- El carrito permite agregar, quitar y editar cantidades.
- El checkout envia el pedido por email.

## Tienda

- El usuario ve productos destacados en la tienda.
- Puede agregar productos al carrito desde las tarjetas.
- Puede revisar el resumen antes de enviar.
- El pedido se envia por email al correo configurado.
- La persona recibe tambien un registro en el panel admin.

## Catalogo

- El catalogo se carga desde el backend.
- Los productos pueden tener precio visible u oculto.
- Si el precio esta oculto, la web no lo muestra.
- Los productos pueden incluir imagen, marca, categoria, tipo, objetivo, sabor, etiquetas y texto descriptivo.

## Panel admin

- El panel se accede por `/login`.
- El panel principal se accede por `/admin`.
- El login exige clave, reCAPTCHA y validacion de sesion.
- En `Productos editables` se puede buscar, crear, duplicar, eliminar y guardar productos.
- En `Pedidos` se pueden ver los ultimos pedidos recibidos.
- Desde el editor se puede subir imagenes al repositorio.
- El campo `Precio publico` controla si el precio se ve o no en el sitio.

## Comportamiento esperado

- Si el precio esta oculto, no se ve en tarjetas ni en el detalle.
- Si el login falla muchas veces, se bloquea temporalmente.
- Si se detecta spam basico en el checkout, el pedido se rechaza.
- Si la verificacion de Google reCAPTCHA falla, el login no avanza.

## Estados importantes

- `Sitio publico`: disponible para todos.
- `Admin bloqueado`: sin sesion valida o sin captcha.
- `Login fallido`: clave invalida o captcha incompleto.
- `Pedido enviado`: el pedido ya fue remitido por email.
- `Pedido rechazado`: el honeypot se lleno o faltan datos.

## Canales de contacto

- WhatsApp para consultas rapidas.
- Instagram para contacto y visibilidad.
- Email para los pedidos generados por checkout.
