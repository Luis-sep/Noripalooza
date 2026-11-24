import { json } from '../../lib/util.js';

// Página pública de amigos: dejan un mensaje para Nori. Las fotos y el video
// se suben después, uno por uno, a /api/amigos/media con el token que devuelve esta llamada.
export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'formato' }, 400);
  const nombre = typeof body.nombre === 'string' ? body.nombre.trim().slice(0, 60) : '';
  const mensaje = typeof body.mensaje === 'string' ? body.mensaje.trim().slice(0, 3000) : '';
  if (!nombre || !mensaje) return json({ error: 'faltan' }, 400);

  const id = Date.now().toString(36) + '-' + crypto.randomUUID().slice(0, 8);
  const token = crypto.randomUUID();
  await env.NORI_KV.put('amigo:' + id, JSON.stringify({ nombre, mensaje, media: [], at: new Date().toISOString(), oculto: false, token }));
  return json({ ok: true, id, token });
}
