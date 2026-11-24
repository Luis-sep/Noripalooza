import { json } from '../../../lib/util.js';
import { QUIZ } from '../../../lib/data.js';

const VENTANA = 2 * 60 * 60 * 1000;

// Guarda las respuestas del quiz de un amigo, ligadas a su mensaje.
export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const key = 'amigo:' + String(body.id || '');
  const msg = await env.NORI_KV.get(key, 'json');
  if (!msg || !msg.token || msg.token !== body.token) return json({ error: 'mensaje' }, 404);
  if (Date.now() - Date.parse(msg.at) > VENTANA) return json({ error: 'tarde' }, 403);
  const r = body.respuestas;
  if (!Array.isArray(r) || r.length !== QUIZ.length || !r.every((x, i) => Number.isInteger(x) && x >= 0 && x < QUIZ[i].o.length)) return json({ error: 'respuestas' }, 400);
  msg.quiz = r;
  await env.NORI_KV.put(key, JSON.stringify(msg));
  return json({ ok: true });
}
