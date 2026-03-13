import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password, slides } = req.body;

  // Validar credenciales
  if (username !== 'adminis' || password !== 'adminiscupn') {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  try {
    // Guardar en Vercel KV
    await kv.set('hero_slides', slides);
    res.status(200).json({ success: true, message: 'Slides guardados correctamente' });
  } catch (error) {
    console.error('Error guardando slides:', error);
    res.status(500).json({ error: 'Error al guardar los slides' });
  }
}
