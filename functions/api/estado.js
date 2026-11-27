import { json, estado, getCookie } from '../../lib/util.js';

// Cada visita renueva la sesión por 400 días, así Nori no tiene que volver a poner su clave.
// También guarda cuándo entró Nori por última vez, para que Luis lo vea en su panel.
export async function onRequestGet({ request, env, data }) {
  const clave = getCookie(request, 'nori_auth');
  const cookie = `nori_auth=${encodeURIComponent(clave)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=34560000`;
  const visto = await env.NORI_KV.get('visto', 'json');
  if (data.role === 'nori' && (!visto || Date.now() - Date.parse(visto.at) > 60000)) {
    await env.NORI_KV.put('visto', JSON.stringify({ at: new Date().toISOString() })).catch(() => {});
  }
  const out = await estado(env, data.role);
  if (data.role === 'luis') out.visto = visto ? visto.at : null;
  return json(out, 200, { 'set-cookie': cookie });
}
