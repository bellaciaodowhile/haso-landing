import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const filePath = path.join(process.cwd(), 'public', 'hero_slides.json');
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los slides' });
  }
}
