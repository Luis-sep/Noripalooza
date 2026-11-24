import { json } from '../../lib/util.js';

const MAX_FOTO = 4 * 1024 * 1024;

// Página pública de amigos: dejan un mensaje (y una foto opcional) para Nori.
// No necesita clave y no devuelve nada de lo guardado.
export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'formato' }, 400);
  const nombre = typeof body.nombre === 'string' ? body.nombre.trim().slice(0, 60) : '';
  const mensaje = typeof body.mensaje === 'string' ? body.mensaje.trim().slice(0, 3000) : '';
  if (!nombre || !mensaje) return json({ error: 'faltan' }, 400);

  let fotoId = null;
  if (typeof body.foto === 'string' && body.foto) {
    const m = body.foto.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!m) return json({ error: 'foto' }, 400);
    const bin = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
    if (bin.byteLength > MAX_FOTO) return json({ error: 'tamano' }, 413);
    fotoId = crypto.randomUUID();
    await env.NORI_KV.put('foto:' + fotoId, bin, { metadata: { ct: m[1], dia: 'amigos', by: 'amigo' } });
  }

  const id = Date.now().toString(36) + '-' + crypto.randomUUID().slice(0, 8);
  await env.NORI_KV.put('amigo:' + id, JSON.stringify({ nombre, mensaje, fotoId, at: new Date().toISOString(), oculto: false }));
  return json({ ok: true });
}
