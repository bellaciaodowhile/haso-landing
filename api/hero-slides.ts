import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Intentar obtener desde KV primero
    const slides = await kv.get('hero_slides');
    
    if (slides) {
      return res.status(200).json(slides);
    }
    
    // Si no existe en KV, devolver datos por defecto
    const defaultSlides = [
      {
        "image": "/src/assets/29/img promo 1.jpg",
        "title": "Contrata tu servicio de Diagnóstico y programa de seguridad y salud en el trabajo y adquiere la capacitación para que tu personal implemente el desarrollo y cumplimiento de la NOM-030-STPS-2009",
        "subtitle": "Cumplimiento Normativo",
        "category": "Cumplimiento normativo"
      },
      {
        "image": "/src/assets/29/img promo 2.jpg",
        "title": "Contrata tu Programa Interno de Protección Civil y Capacita tu Brigadas por un 20% válido hasta el 30 de Enero de 2026.",
        "subtitle": "Protección Civil",
        "category": "Protección Civil"
      },
      {
        "image": "/src/assets/29/img promo 3.jpg",
        "title": "Precio especial por tiempo limitado. Descuento del 5% en el paquete integral si se agenda entre Enero y Febrero 2026. Aplica para empresas nuevas y clientes recurrentes.",
        "subtitle": "Ambiental",
        "category": "Ambiental"
      }
    ];
    
    res.status(200).json(defaultSlides);
  } catch (error) {
    console.error('Error en hero-slides:', error);
    res.status(500).json({ error: 'Error al leer los slides' });
  }
}
