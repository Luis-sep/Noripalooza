import { json, estado, today, findDay } from '../../lib/util.js';

// Nori sella su cápsula del tiempo el día del cierre. Una vez sellada no se cambia.
export async function onRequestPost({ request, env, data }) {
  if (data.role !== 'nori') return json({ error: 'solo-nori' }, 403);
  if (findDay('d06').date > today()) return json({ error: 'bloqueado' }, 403);
  if (await env.NORI_KV.get('capsula')) return json({ error: 'ya-sellada' }, 409);
  const { text } = await request.json().catch(() => ({}));
  if (typeof text !== 'string' || !text.trim()) return json({ error: 'vacia' }, 400);
  await env.NORI_KV.put('capsula', JSON.stringify({ text: text.slice(0, 20000), sealedAt: new Date().toISOString() }));
  return json(await estado(env, data.role));
}
