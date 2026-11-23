import { DAYS, CAPSULE_DATE } from './data.js';

export const json = (obj, status = 200, headers = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

// Fecha de hoy en Chile, como "2026-11-28".
export const today = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());

export function getCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

export function roleFor(clave, env) {
  if (!clave) return null;
  if (env.CLAVE_NORI && clave === env.CLAVE_NORI) return 'nori';
  if (env.CLAVE_LUIS && clave === env.CLAVE_LUIS) return 'luis';
  return null;
}

export const findDay = (k) => DAYS.find((d) => d.k === k);

// Todo lo que la página necesita, filtrado según quién pregunta y qué día es.
export async function estado(env, role) {
  const t = today();
  const kv = env.NORI_KV;
  const [notas, progreso, capsula, resumen] = await Promise.all([
    Promise.all(DAYS.map((d) => kv.get('nota:' + d.k, 'json'))),
    Promise.all(DAYS.map((d) => kv.get('dia:' + d.k, 'json'))),
    kv.get('capsula', 'json'),
    kv.get('resumen', 'json'),
  ]);

  const days = DAYS.map((d, i) => {
    const unlocked = d.date <= t;
    const out = { k: d.k, date: d.date, dow: d.dow, n: d.n, m: d.m, t: d.t, s: d.s, c: d.c, a: d.a, unlocked };
    if (unlocked || role === 'luis') {
      const n = notas[i] || {};
      out.r = d.r;
      out.carta = n.carta ?? d.carta;
      out.pista = n.pista ?? '';
    }
    return out;
  });

  const prog = {};
  DAYS.forEach((d, i) => {
    const p = { ...(progreso[i] || {}) };
    if (role === 'luis') { delete p.note; delete p.expectativa; } // lo que ella escribe es solo de ella
    prog[d.k] = p;
  });

  return {
    role,
    today: t,
    days,
    progreso: prog,
    resumen: resumen?.text || '',
    capsula: {
      sealedAt: capsula?.sealedAt || null,
      text: capsula && t >= CAPSULE_DATE ? capsula.text : null,
    },
  };
}
