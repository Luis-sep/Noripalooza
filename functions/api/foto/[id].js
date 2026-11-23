export async function onRequestGet({ env, params }) {
  if (!/^[0-9a-f-]{36}$/.test(params.id)) return new Response('No encontrada', { status: 404 });
  const { value, metadata } = await env.NORI_KV.getWithMetadata('foto:' + params.id, 'arrayBuffer');
  if (!value) return new Response('No encontrada', { status: 404 });
  return new Response(value, {
    headers: { 'content-type': metadata?.ct || 'image/jpeg', 'cache-control': 'private, max-age=31536000, immutable' },
  });
}
