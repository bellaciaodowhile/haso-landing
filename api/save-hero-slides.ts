import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password } = req.body;

  // Validar credenciales
  if (username !== 'adminis' || password !== 'adminiscupn') {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // En Vercel sin base de datos, no podemos guardar cambios persistentes
  // Esta función solo valida que el usuario puede "guardar" pero los cambios no persisten
  res.status(200).json({ 
    success: true, 
    message: 'Nota: Los cambios no persisten en Vercel sin base de datos. Configura Vercel KV para persistencia.' 
  });
}
