<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Verificar autenticación básica
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username !== 'adminis' || $password !== 'adminiscupn') {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales incorrectas']);
    exit();
}

// Obtener los datos
$data = $_POST['slides'] ?? '';

if (empty($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'No se recibieron datos']);
    exit();
}

// Validar que sea JSON válido
$slides = json_decode($data);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit();
}

// Guardar en el archivo
$file = __DIR__ . '/hero_slides.json';
$result = file_put_contents($file, json_encode($slides, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar el archivo']);
    exit();
}

echo json_encode(['success' => true, 'message' => 'Cambios guardados correctamente']);
?>
