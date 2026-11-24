// Sirve una foto o un video guardado. Responde por partes (Range) para que los videos
// se puedan reproducir en el celular, sobre todo en iPhone.
export async function onRequestGet({ request, env, params }) {
  if (!/^[0-9a-f-]{36}$/.test(params.id)) return new Response('No encontrada', { status: 404 });
  const { value, metadata } = await env.NORI_KV.getWithMetadata('foto:' + params.id, 'arrayBuffer');
  if (!value) return new Response('No encontrada', { status: 404 });
  const ct = metadata?.ct || 'image/jpeg';
  const total = value.byteLength;
  const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : ct.includes('quicktime') ? 'mov' : ct.includes('webm') ? 'webm' : ct.includes('mp4') ? 'mp4' : 'jpg';
  const base = { 'content-type': ct, 'accept-ranges': 'bytes', 'cache-control': 'private, max-age=31536000, immutable', 'content-disposition': `inline; filename="noripalooza-${params.id.slice(0, 8)}.${ext}"` };

  const range = request.headers.get('range');
  const m = range && range.match(/^bytes=(\d*)-(\d*)$/);
  if (m && (m[1] || m[2])) {
    let start, end;
    if (m[1]) { start = +m[1]; end = m[2] ? Math.min(+m[2], total - 1) : total - 1; }
    else { start = Math.max(0, total - +m[2]); end = total - 1; }
    if (start > end || start >= total) return new Response(null, { status: 416, headers: { 'content-range': `bytes */${total}` } });
    return new Response(value.slice(start, end + 1), {
      status: 206,
      headers: { ...base, 'content-range': `bytes ${start}-${end}/${total}`, 'content-length': String(end - start + 1) },
    });
  }
  return new Response(value, { headers: { ...base, 'content-length': String(total) } });
}
