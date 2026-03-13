import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Nota: En Vercel, el almacenamiento de archivos es efímero
  // Para producción, deberías usar un servicio como Cloudinary, AWS S3, etc.
  res.status(501).json({ 
    error: 'La subida de imágenes requiere configurar un servicio de almacenamiento externo (Cloudinary, AWS S3, etc.)' 
  });
}
