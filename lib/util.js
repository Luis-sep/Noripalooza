import { DAYS, CAPSULE_DATE, AMIGOS_DATE, DESAFIOS_DATE, QUIZ, QUIZ_CLAVE, TITULOS, SECRETO_DEFAULT } from './data.js';

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
  const [notas, progreso, capsula, resumen, secreto, mensajes, quiz, hechos] = await Promise.all([
    Promise.all(DAYS.map((d) => kv.get('nota:' + d.k, 'json'))),
    Promise.all(DAYS.map((d) => kv.get('dia:' + d.k, 'json'))),
    kv.get('capsula', 'json'),
    kv.get('resumen', 'json'),
    kv.get('secreto', 'json'),
    kv.get('mensajes', 'json'),
    kv.get('quiz', 'json'),
    kv.get('desafios', 'json'),
  ]);

  const days = DAYS.map((d, i) => {
    const unlocked = d.date <= t;
    const out = { k: d.k, date: d.date, dow: d.dow, n: d.n, m: d.m, t: d.t, s: d.s, c: d.c, a: d.a, unlocked };
    if (unlocked || role === 'luis') {
      const n = notas[i] || {};
      out.r = d.r;
      out.f = d.f || '';
      out.foto = d.foto || '';
      out.carta = n.carta ?? d.carta;
      out.pista = n.pista ?? '';
      out.spotify = n.spotify || d.sp || null;
    }
    return out;
  });

  const prog = {};
  DAYS.forEach((d, i) => {
    const p = { ...(progreso[i] || {}) };
    if (role === 'luis') { delete p.note; delete p.expectativa; } // lo que ella escribe es solo de ella
    prog[d.k] = p;
  });

  const clave = Array.isArray(quiz?.clave) ? quiz.clave : QUIZ_CLAVE;
  const mostrarQuiz = quiz?.mostrar !== false;
  const puntaje = (r) => (clave && Array.isArray(r) ? r.filter((x, i) => x === clave[i]).length : null);
  let amigos = [];
  let desafios = [];
  let amigosCount = 0;
  if (role === 'luis' || t >= DESAFIOS_DATE) {
    const keys = [];
    let cursor;
    do {
      const page = await kv.list({ prefix: 'amigo:', cursor });
      keys.push(...page.keys.map((k) => k.name));
      cursor = page.list_complete ? null : page.cursor;
    } while (cursor);
    const items = (await Promise.all(keys.map((k) => kv.get(k, 'json'))))
      .map((a, i) => a && { ...a, id: keys[i].slice(6) })
      .filter(Boolean)
      .sort((x, y) => (x.at < y.at ? -1 : 1));
    amigosCount = items.filter((a) => !a.oculto).length;
    const h = hechos || {};
    // Los desafíos se sueltan de a uno por día desde el 27 (más si hay más de 10), en orden de llegada.
    const orden = (await kv.get('desafiosOrden', 'json')) || [];
    const pos = (a) => { const i = orden.indexOf(a.id); return i < 0 ? 1e6 : i; };
    const desList = items.filter((a) => a.desafio).map((a, i) => [a, i]).sort((x, y) => pos(x[0]) - pos(y[0]) || x[1] - y[1]).map((x) => x[0]);
    const visibles = desList.filter((a) => !a.oculto);
    const N = visibles.length;
    const dayNum = (fecha) => Math.floor((Date.parse(fecha) - Date.parse(DESAFIOS_DATE)) / 864e5) + 1;
    const cuantos = (d) => (d < 1 ? 0 : d >= DAYS.length ? N : Math.min(N, Math.max(d, Math.ceil((N * d) / DAYS.length))));
    const primerDia = (i) => { for (let d = 1; d <= DAYS.length; d++) if (cuantos(d) > i) return d; return DAYS.length; };
    const aparece = new Map(visibles.map((a, i) => [a.id, DAYS[primerDia(i) - 1]]));
    const hoyN = cuantos(dayNum(t));
    desafios = desList
      .filter((a) => (role === 'luis' || (!a.oculto && visibles.indexOf(a) < hoyN)))
      .map((a) => ({ aparece: aparece.get(a.id) ? aparece.get(a.id).dow + ' ' + aparece.get(a.id).n + ' ' + aparece.get(a.id).m : null, id: a.id, nombre: a.nombre, texto: a.desafio, oculto: !!a.oculto, apareceFecha: aparece.get(a.id) ? aparece.get(a.id).date : null, hecho: !!h[a.id]?.hecho, fotos: h[a.id]?.fotos || [] }));
    if (role === 'luis' || t >= AMIGOS_DATE) {
      amigos = items
        .filter((a) => role === 'luis' || !a.oculto)
        .map((a) => ({ id: a.id, nombre: a.nombre, mensaje: a.mensaje, media: a.media || (a.fotoId ? [{ id: a.fotoId, tipo: 'img' }] : []), at: a.at, oculto: !!a.oculto, jugo: Array.isArray(a.quiz), anecdota: a.anecdota || '', tieneAnecdota: !!a.anecdota, desafio: a.desafio || '', puntaje: role === 'luis' || mostrarQuiz ? puntaje(a.quiz) : null }));
    }
  }

  const completados = DAYS.filter((d) => { const p = prog[d.k]; return p && (p.done || p.pass); }).length;
  const secretoAbierto = completados >= DAYS.length;

  return {
    role,
    completados,
    secreto: {
      abierto: secretoAbierto,
      text: role === 'luis' || secretoAbierto ? (secreto?.text || SECRETO_DEFAULT) : null,
    },
    mensajes: (mensajes || []).slice().reverse(),
    quiz: {
      preguntas: QUIZ,
      titulos: TITULOS,
      clave: role === 'luis' ? clave : null,
      listo: !!clave,
      mostrar: role === 'luis' ? mostrarQuiz : mostrarQuiz && !!clave,
    },
    amigos,
    desafios,
    amigosCount,
    amigosDate: AMIGOS_DATE,
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
