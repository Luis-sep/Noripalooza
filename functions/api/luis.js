import { json, estado, findDay } from '../../lib/util.js';

// Herramientas de Luis: editar la nota y la pista de cada día, y pegar la carta final.
export async function onRequestPost({ request, env, data }) {
  if (data.role !== 'luis') return json({ error: 'solo-luis' }, 403);
  const body = await request.json().catch(() => ({}));

  if (body.tipo === 'nota') {
    const d = findDay(body.k);
    if (!d) return json({ error: 'dia' }, 404);
    const carta = typeof body.carta === 'string' ? body.carta.slice(0, 2000) : d.carta;
    const pista = typeof body.pista === 'string' ? body.pista.slice(0, 1000) : '';
    await env.NORI_KV.put('nota:' + d.k, JSON.stringify({ carta, pista }));
  } else if (body.tipo === 'resumen') {
    const text = typeof body.text === 'string' ? body.text.slice(0, 20000) : '';
    await env.NORI_KV.put('resumen', JSON.stringify({ text, at: new Date().toISOString() }));
  } else if (body.tipo === 'ocultar') {
    const key = 'amigo:' + String(body.id || '');
    const cur = await env.NORI_KV.get(key, 'json');
    if (!cur) return json({ error: 'mensaje' }, 404);
    cur.oculto = body.oculto === true;
    await env.NORI_KV.put(key, JSON.stringify(cur));
  } else {
    return json({ error: 'tipo' }, 400);
  }
  return json(await estado(env, data.role));
}
