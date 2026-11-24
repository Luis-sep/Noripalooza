import { json, roleFor } from '../../lib/util.js';

export async function onRequestPost({ request, env }) {
  const { clave } = await request.json().catch(() => ({}));
  const role = roleFor(typeof clave === 'string' ? clave.trim() : '', env);
  if (!role) return json({ error: 'clave' }, 401);
  const cookie = `nori_auth=${encodeURIComponent(clave.trim())}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=34560000`;
  return json({ role }, 200, { 'set-cookie': cookie });
}

export async function onRequestDelete() {
  return json({ ok: true }, 200, { 'set-cookie': 'nori_auth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0' });
}
