import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  category: string;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadSlides();
    }
  }, []);

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides');
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error('Error cargando slides:', error);
      setSaveMessage('Error al cargar los slides');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'adminis' && password === 'adminiscupn') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
      loadSlides();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setUsername('');
    setPassword('');
    navigate('/');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save-hero-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'adminis',
          password: 'adminiscupn',
          slides
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSaveMessage('Cambios guardados correctamente en el servidor');
      } else {
        setSaveMessage('Error: ' + (result.error || 'No se pudieron guardar los cambios'));
      }
    } catch (error) {
      console.error('Error guardando:', error);
      setSaveMessage('Error al conectar con el servidor');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        handleUpdateSlide(index, 'image', result.imageUrl);
        setSaveMessage('Imagen subida correctamente');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Error: ' + (result.error || 'No se pudo subir la imagen'));
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setSaveMessage('Error al subir la imagen');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleUpdateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Editar Carrusel del Hero</h2>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>

          {saveMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {saveMessage}
            </div>
          )}

          <div className="space-y-6">
            {slides.map((slide, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {editingIndex === index ? 'Cerrar' : 'Editar'}
                  </button>
                </div>

                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagen Actual
                      </label>
                      <div className="mb-3">
                        <img 
                          src={slide.image} 
                          alt="Preview" 
                          className="w-full max-w-md h-48 object-cover rounded-md border border-gray-300"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <label className="block">
                        <span className="sr-only">Subir nueva imagen</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(index, file);
                            }
                          }}
                          disabled={uploadingIndex === index}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100
                            disabled:opacity-50"
                        />
                      </label>
                      {uploadingIndex === index && (
                        <p className="text-sm text-blue-600 mt-2">Subiendo imagen...</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        O ingresa la ruta manualmente:
                      </p>
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => handleUpdateSlide(index, 'image', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="/uploads/imagen.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleUpdateSlide(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtítulo
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => handleUpdateSlide(index, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría (separa con comas para múltiples tags)
                      </label>
                      <input
                        type="text"
                        value={slide.category}
                        onChange={(e) => handleUpdateSlide(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Ejemplo: Seguridad, Higiene, Capacitación"
                      />
                      {slide.category && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {slide.category.split(',').map((tag, tagIndex) => {
                            const trimmedTag = tag.trim();
                            return trimmedTag ? (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                              >
                                {trimmedTag}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Imagen:</span>
                      <img 
                        src={slide.image} 
                        alt="Preview" 
                        className="mt-2 w-full max-w-xs h-32 object-cover rounded-md border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Crect fill="%23ddd" width="200" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo disponible%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <p><span className="font-medium">Título:</span> {slide.title}</p>
                    <p><span className="font-medium">Subtítulo:</span> {slide.subtitle}</p>
                    <div>
                      <span className="font-medium">Categoría:</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {slide.category.split(',').map((tag, tagIndex) => {
                          const trimmedTag = tag.trim();
                          return trimmedTag ? (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {trimmedTag}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Nota:</span> Los cambios se guardan directamente en el archivo hero_slides.json 
              del servidor. Puedes subir nuevas imágenes o usar las rutas existentes. Las imágenes subidas se guardan en /uploads/.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
