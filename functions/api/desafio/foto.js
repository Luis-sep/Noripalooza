import { json, estado, today } from '../../../lib/util.js';
import { DESAFIOS_DATE } from '../../../lib/data.js';

const MAX = 10 * 1024 * 1024;

// Foto de prueba de un desafío: POST /api/desafio/foto?id=... con la imagen como cuerpo.
export async function onRequestPost({ request, env, data }) {
  if (data.role !== 'nori') return json({ error: 'solo-nori' }, 403);
  if (today() < DESAFIOS_DATE) return json({ error: 'bloqueado' }, 403);
  const id = new URL(request.url).searchParams.get('id') || '';
  const msg = await env.NORI_KV.get('amigo:' + id, 'json');
  if (!msg || !msg.desafio || msg.oculto) return json({ error: 'desafio' }, 404);
  const ct = request.headers.get('content-type') || '';
  if (!/^image\/(jpeg|png|webp|gif)$/.test(ct)) return json({ error: 'tipo' }, 415);
  const buf = await request.arrayBuffer();
  if (!buf.byteLength || buf.byteLength > MAX) return json({ error: 'tamano' }, 413);
  const fotoId = crypto.randomUUID();
  await env.NORI_KV.put('foto:' + fotoId, buf, { metadata: { ct, dia: 'desafio', by: 'nori' } });
  const all = (await env.NORI_KV.get('desafios', 'json')) || {};
  const cur = all[id] || {};
  all[id] = { ...cur, hecho: true, fotos: [...(cur.fotos || []), fotoId] };
  await env.NORI_KV.put('desafios', JSON.stringify(all));
  return json(await estado(env, data.role));
}
