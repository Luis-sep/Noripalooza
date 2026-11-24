// Punto de entrada para Cloudflare Workers: sirve la página desde /public
// y responde las rutas /api/* con los mismos módulos de functions/.
import { onRequest as middleware } from '../functions/api/_middleware.js';
import * as login from '../functions/api/login.js';
import * as estado from '../functions/api/estado.js';
import * as dia from '../functions/api/dia/[k].js';
import * as fotoUp from '../functions/api/foto/index.js';
import * as fotoGet from '../functions/api/foto/[id].js';
import * as capsula from '../functions/api/capsula.js';
import * as luis from '../functions/api/luis.js';
import { json } from '../lib/util.js';

const routes = [
  ['/api/login', login],
  ['/api/estado', estado],
  [/^\/api\/dia\/([^/]+)$/, dia, ['k']],
  ['/api/foto', fotoUp],
  [/^\/api\/foto\/([^/]+)$/, fotoGet, ['id']],
  ['/api/capsula', capsula],
  ['/api/luis', luis],
];

const handlerFor = (mod, method) =>
  mod['onRequest' + method[0] + method.slice(1).toLowerCase()] || mod.onRequest;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    for (const [pat, mod, keys] of routes) {
      const params = {};
      if (typeof pat === 'string') {
        if (url.pathname !== pat) continue;
      } else {
        const m = url.pathname.match(pat);
        if (!m) continue;
        (keys || []).forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      }
      const h = handlerFor(mod, request.method);
      if (!h) return json({ error: 'metodo' }, 405);
      const c = { request, env, params, data: {}, waitUntil: (p) => ctx.waitUntil(p) };
      c.next = () => h(c);
      return middleware(c);
    }
    return json({ error: 'ruta' }, 404);
  },
};
