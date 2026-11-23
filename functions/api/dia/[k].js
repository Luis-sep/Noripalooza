import { json, estado, today, findDay } from '../../../lib/util.js';
import { DAYS, MOODS, CUMPLIO, PASSES } from '../../../lib/data.js';

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : undefined);

// Nori guarda lo de su día: sobre abierto, respuesta, ánimo, etc.
export async function onRequestPost({ request, env, params, data }) {
  if (data.role !== 'nori') return json({ error: 'solo-nori' }, 403);
  const d = findDay(params.k);
  if (!d) return json({ error: 'dia' }, 404);
  if (d.date > today()) return json({ error: 'bloqueado' }, 403);

  const body = await request.json().catch(() => ({}));
  const clean = {};
  if (body.opened === true) clean.opened = true;
  if ('note' in body) clean.note = str(body.note, 10000) ?? '';
  if ('expectativa' in body) clean.expectativa = str(body.expectativa, 500) ?? '';
  if ('mood' in body) clean.mood = MOODS.includes(body.mood) ? body.mood : null;
  if ('cumplio' in body) clean.cumplio = CUMPLIO.includes(body.cumplio) ? body.cumplio : null;
  if ('done' in body) clean.done = body.done === true;
  if ('pass' in body) clean.pass = body.pass === true;

  const key = 'dia:' + d.k;
  const cur = (await env.NORI_KV.get(key, 'json')) || {};

  if (clean.pass && !cur.pass) {
    const others = await Promise.all(DAYS.filter((x) => x.k !== d.k).map((x) => env.NORI_KV.get('dia:' + x.k, 'json')));
    if (others.filter((p) => p && p.pass).length >= PASSES) return json({ error: 'sin-pases' }, 409);
  }

  const next = { ...cur, ...clean };
  if (clean.opened && !cur.openedAt) next.openedAt = new Date().toISOString();
  await env.NORI_KV.put(key, JSON.stringify(next));
  return json(await estado(env, data.role));
}
