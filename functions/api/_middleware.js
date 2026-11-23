import { json, getCookie, roleFor } from '../../lib/util.js';

// Protege todo /api/* salvo el login.
export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  if (url.pathname === '/api/login') return ctx.next();
  if (!ctx.env.NORI_KV) return json({ error: 'kv' }, 500);
  const role = roleFor(getCookie(ctx.request, 'nori_auth'), ctx.env);
  if (!role) return json({ error: 'auth' }, 401);
  ctx.data.role = role;
  return ctx.next();
}
