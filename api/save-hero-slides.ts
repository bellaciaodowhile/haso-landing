import type { VercelRequest, VercelResponse } from '@vercel/node';

// Intentar importar KV, si no está disponible usar fallback
let kv: any = null;
try {
  kv = require('@vercel/kv').kv;
} catch (e) {
  console.log('KV no disponible');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password, slides } = req.body;

  // Validar credenciales
  if (username !== 'adminis' || password !== 'adminiscupn') {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // Validar que slides sea un array
  if (!Array.isArray(slides)) {
    return res.status(400).json({ error: 'Formato de datos inválido' });
  }

  try {
    // Si KV está disponible, guardar
    if (kv) {
      await kv.set('hero_slides', slides);
      return res.status(200).json({ 
        success: true, 
        message: 'Slides guardados correctamente' 
      });
    } else {
      // Si no hay KV configurado
      return res.status(200).json({ 
        success: false, 
        message: 'Vercel KV no está configurado. Los cambios no se guardarán de forma persistente.' 
      });
    }
  } catch (error) {
    console.error('Error guardando slides:', error);
    res.status(500).json({ error: 'Error al guardar los slides' });
  }
}
