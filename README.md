# Noripalooza · Tu festival

App del festival de Nori (27 nov – 6 dic 2026). Funciona en Cloudflare Pages con:

- `public/index.html`: la página que ven Nori y Luis.
- `functions/api/…`: el servidor (guarda respuestas, fotos, notas y la cápsula).
- `lib/data.js`: los días, los retos, tus notas iniciales y las canciones.

Los retos y tus notas viven en el servidor y solo se envían el día en que se desbloquea cada sobre (hora de Chile), así que Nori no puede adelantarse.

## Puesta en marcha (unos 15 minutos)

El almacenamiento KV `noripalooza` ya está creado en tu Cloudflare y conectado en `wrangler.toml`.

1. **GitHub.** Crea un repositorio nuevo y privado llamado `noripalooza`. Elige "uploading an existing file" y arrastra las carpetas `public`, `functions`, `lib` y los archivos `wrangler.toml` y `README.md`. Confirma con "Commit changes".
2. **Cloudflare, la página.** Ve a **Workers & Pages → Create → Pages → Connect to Git**, elige el repositorio `noripalooza` y configura:
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Build output directory: `public`

   Luego toca **Save and Deploy**.
3. **Las claves.** En el proyecto, entra a **Settings → Variables and Secrets** y agrega dos secretos (tipo *Secret*):
   - `CLAVE_NORI`: la clave que le vas a dar a Nori.
   - `CLAVE_LUIS`: tu clave, distinta y que solo sepas tú.
4. **Volver a publicar.** En **Deployments**, toca **Retry deployment** en el último despliegue para que tome las claves.
5. **Probar.** Abre la dirección que te muestra Cloudflare (algo como `https://noripalooza.pages.dev`) y entra con `CLAVE_LUIS`.

## Cómo se usa

- **Nori** entra con su clave desde el celular. Antes del 27 ve una cuenta regresiva y después abre un sobre por día. En cada sobre escribe, marca su ánimo y si se cumplió lo que esperaba, y sube fotos.
- **Luis** entra con su clave y ve el panel: el avance día por día (sin leer lo que ella escribe), sus notas y pistas para editarlas, y el espacio para pegar la carta final.
- **Domingo 6:** Nori puede tocar "Copiar mi semana" y mandártela. Se la pegas a Claude, le pides la carta y la pegas en tu panel. Además, ella sella su cápsula del tiempo, que se abre el 1 de diciembre de 2027.

## Cambios

- **Notas y pistas:** desde tu panel, sin tocar código.
- **Retos o canciones:** edita `lib/data.js` en GitHub; Cloudflare vuelve a publicar solo.
