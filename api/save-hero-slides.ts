import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password, slides } = req.body;

  // Validar credenciales
  if (username !== 'adminis' || password !== 'adminiscupn') {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const filePath = path.join(process.cwd(), 'public', 'hero_slides.json');

  try {
    fs.writeFileSync(filePath, JSON.stringify(slides, null, 2), 'utf-8');
    res.status(200).json({ success: true, message: 'Slides guardados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar los slides' });
  }
}
