import { json } from '../../../lib/util.js';

const MAX = 24 * 1024 * 1024; // el almacenamiento acepta hasta 25 MB por archivo
const IMG = /^image\/(jpeg|png|webp)$/;
const VID = /^video\/(mp4|quicktime|webm)$/;
const VENTANA = 2 * 60 * 60 * 1000; // se puede adjuntar hasta 2 horas después de escribir el mensaje

// POST /api/amigos/media?id=...&token=... con la foto o el video como cuerpo.
export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const token = url.searchParams.get('token') || '';
  const key = 'amigo:' + id;
  const msg = await env.NORI_KV.get(key, 'json');
  if (!msg || !msg.token || msg.token !== token) return json({ error: 'mensaje' }, 404);
  if (Date.now() - Date.parse(msg.at) > VENTANA) return json({ error: 'tarde' }, 403);

  const ct = (request.headers.get('content-type') || '').toLowerCase();
  const tipo = IMG.test(ct) ? 'img' : VID.test(ct) ? 'video' : null;
  if (!tipo) return json({ error: 'tipo' }, 415);
  const media = msg.media || [];
  if (tipo === 'img' && media.filter((m) => m.tipo === 'img').length >= 3) return json({ error: 'max-fotos' }, 409);
  if (tipo === 'video' && media.some((m) => m.tipo === 'video')) return json({ error: 'max-video' }, 409);

  const buf = await request.arrayBuffer();
  if (!buf.byteLength) return json({ error: 'vacio' }, 400);
  if (buf.byteLength > MAX) return json({ error: 'tamano' }, 413);

  const fileId = crypto.randomUUID();
  await env.NORI_KV.put('foto:' + fileId, buf, { metadata: { ct, dia: 'amigos', by: 'amigo' } });
  msg.media = [...media, { id: fileId, tipo }];
  await env.NORI_KV.put(key, JSON.stringify(msg));
  return json({ ok: true });
}
