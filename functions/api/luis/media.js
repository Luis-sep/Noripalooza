import { json, estado } from '../../../lib/util.js';

const MAX = 24 * 1024 * 1024;
const IMG = /^image\/(jpeg|png|webp)$/;
const VID = /^video\/(mp4|quicktime|webm)$/;

// Luis agrega una foto o un video a un mensaje de amigo que ya existe: POST /api/luis/media?id=...
export async function onRequestPost({ request, env, data }) {
  if (data.role !== 'luis') return json({ error: 'solo-luis' }, 403);
  const id = new URL(request.url).searchParams.get('id') || '';
  const key = 'amigo:' + id;
  const msg = await env.NORI_KV.get(key, 'json');
  if (!msg) return json({ error: 'mensaje' }, 404);
  const ct = (request.headers.get('content-type') || '').toLowerCase();
  const tipo = IMG.test(ct) ? 'img' : VID.test(ct) ? 'video' : null;
  if (!tipo) return json({ error: 'tipo' }, 415);
  const buf = await request.arrayBuffer();
  if (!buf.byteLength) return json({ error: 'vacio' }, 400);
  if (buf.byteLength > MAX) return json({ error: 'tamano' }, 413);
  const fileId = crypto.randomUUID();
  await env.NORI_KV.put('foto:' + fileId, buf, { metadata: { ct, dia: 'amigos', by: 'luis' } });
  msg.media = [...(msg.media || (msg.fotoId ? [{ id: msg.fotoId, tipo: 'img' }] : [])), { id: fileId, tipo }];
  await env.NORI_KV.put(key, JSON.stringify(msg));
  return json(await estado(env, data.role));
}
