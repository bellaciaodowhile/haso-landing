import type { VercelRequest, VercelResponse } from '@vercel/node';

// Intentar importar KV, si no está disponible usar fallback
let kv: any = null;
try {
  kv = require('@vercel/kv').kv;
} catch (e) {
  console.log('KV no disponible, usando datos por defecto');
}

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Si KV está disponible, intentar obtener datos guardados
    if (kv) {
      try {
        const slides = await kv.get('hero_slides');
        if (slides && Array.isArray(slides)) {
          res.setHeader('Content-Type', 'application/json');
          return res.status(200).json(slides);
        }
      } catch (kvError) {
        console.error('Error leyendo de KV:', kvError);
      }
    }
    
    // Devolver datos por defecto
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(defaultSlides);
  } catch (error) {
    console.error('Error en hero-slides:', error);
    res.status(500).json({ error: 'Error al leer los slides' });
  }
}
