# Noripalooza · Tu festival

App del festival de Nori (27 nov – 6 dic 2026). Funciona en Cloudflare Pages con:

- `public/index.html`: la página que ven Nori y Luis.
- `functions/api/…`: el servidor (guarda respuestas, fotos, notas y la cápsula).
- `lib/data.js`: los días, los retos, tus notas iniciales y las canciones.

Los retos y tus notas viven en el servidor y solo se envían el día en que se desbloquea cada sobre (hora de Chile), así que Nori no puede adelantarse.

## Puesta en marcha

Funciona como un **Worker** de Cloudflare conectado a este repositorio: cada cambio que se sube a `main` se publica solo. El almacenamiento KV `noripalooza` ya está conectado en `wrangler.toml`.

1. En Cloudflare, abre el Worker **noripalooza → Settings → Variables and Secrets** y agrega dos secretos (tipo *Secret*):
   - `CLAVE_NORI`: la clave de Nori.
   - `CLAVE_LUIS`: tu clave, distinta y que solo sepas tú.
2. Abre la dirección del Worker (`https://noripalooza.<tu-subdominio>.workers.dev`) y entra con `CLAVE_LUIS`.

## Cómo se usa

- **Nori** entra con su clave desde el celular. Antes del 27 ve una cuenta regresiva y después abre un sobre por día. En cada sobre escribe, marca su ánimo y si se cumplió lo que esperaba, y sube fotos.
- **Luis** entra con su clave y ve el panel: el avance día por día (sin leer lo que ella escribe), sus notas y pistas para editarlas, y el espacio para pegar la carta final.
- **Domingo 6:** Nori puede tocar "Copiar mi semana" y mandártela. Se la pegas a Claude, le pides la carta y la pegas en tu panel. Además, ella sella su cápsula del tiempo, que se abre el 1 de diciembre de 2027.

## Cambios

- **Notas y pistas:** desde tu panel, sin tocar código.
- **Retos o canciones:** edita `lib/data.js` en GitHub; Cloudflare vuelve a publicar solo.
