import { json, estado, today } from '../../lib/util.js';
import { DESAFIOS_DATE } from '../../lib/data.js';

// Nori marca un desafío de sus amigos como hecho (o lo desmarca).
export async function onRequestPost({ request, env, data }) {
  if (data.role !== 'nori') return json({ error: 'solo-nori' }, 403);
  if (today() < DESAFIOS_DATE) return json({ error: 'bloqueado' }, 403);
  const body = await request.json().catch(() => ({}));
  const msg = await env.NORI_KV.get('amigo:' + String(body.id || ''), 'json');
  if (!msg || !msg.desafio || msg.oculto) return json({ error: 'desafio' }, 404);
  const all = (await env.NORI_KV.get('desafios', 'json')) || {};
  all[body.id] = { ...(all[body.id] || {}), hecho: body.hecho === true };
  await env.NORI_KV.put('desafios', JSON.stringify(all));
  return json(await estado(env, data.role));
}
