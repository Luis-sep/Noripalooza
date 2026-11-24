import { json, estado, getCookie } from '../../lib/util.js';

// Cada visita renueva la sesión por 400 días, así Nori no tiene que volver a poner su clave.
export async function onRequestGet({ request, env, data }) {
  const clave = getCookie(request, 'nori_auth');
  const cookie = `nori_auth=${encodeURIComponent(clave)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=34560000`;
  return json(await estado(env, data.role), 200, { 'set-cookie': cookie });
}
