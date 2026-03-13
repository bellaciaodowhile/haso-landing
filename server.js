import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Endpoint para subir imagen
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ninguna imagen' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// Endpoint para guardar slides
app.post('/api/save-hero-slides', (req, res) => {
  try {
    const { username, password, slides } = req.body;
    
    // Verificar credenciales
    if (username !== 'adminis' || password !== 'adminiscupn') {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    
    // Guardar en el archivo JSON
    const filePath = path.join(__dirname, 'public/hero_slides.json');
    fs.writeFileSync(filePath, JSON.stringify(slides, null, 2));
    
    res.json({ success: true, message: 'Cambios guardados correctamente' });
  } catch (error) {
    console.error('Error guardando slides:', error);
    res.status(500).json({ error: 'Error al guardar los cambios' });
  }
});

// Endpoint para obtener slides
app.get('/api/hero-slides', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public/hero_slides.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error leyendo slides:', error);
    res.status(500).json({ error: 'Error al cargar los slides' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
