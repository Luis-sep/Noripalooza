import { json, estado, today, findDay } from '../../../lib/util.js';

const MAX = 10 * 1024 * 1024; // 10 MB por foto (la página las achica antes de subirlas)

// Sube una foto al día indicado: POST /api/foto?dia=d28 con la imagen como cuerpo.
export async function onRequestPost({ request, env, data }) {
  const url = new URL(request.url);
  const d = findDay(url.searchParams.get('dia'));
  if (!d) return json({ error: 'dia' }, 404);
  if (data.role === 'nori' && d.date > today()) return json({ error: 'bloqueado' }, 403);

  const ct = request.headers.get('content-type') || '';
  if (!/^image\/(jpeg|png|webp|gif)$/.test(ct)) return json({ error: 'tipo' }, 415);
  const buf = await request.arrayBuffer();
  if (!buf.byteLength || buf.byteLength > MAX) return json({ error: 'tamano' }, 413);

  const id = crypto.randomUUID();
  await env.NORI_KV.put('foto:' + id, buf, { metadata: { ct, dia: d.k, by: data.role } });

  const key = 'dia:' + d.k;
  const cur = (await env.NORI_KV.get(key, 'json')) || {};
  cur.photos = [...(cur.photos || []), id];
  await env.NORI_KV.put(key, JSON.stringify(cur));
  return json(await estado(env, data.role));
}
