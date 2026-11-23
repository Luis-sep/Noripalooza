import { json, estado } from '../../lib/util.js';

export async function onRequestGet({ env, data }) {
  return json(await estado(env, data.role));
}
