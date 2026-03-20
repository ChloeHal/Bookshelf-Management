<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = (int) ($data['id'] ?? 0);
$rating = (int) ($data['rating'] ?? 0);

if (!$id || $rating < 0 || $rating > 5) {
    http_response_code(400);
    echo json_encode(['error' => 'ID et note (0-5) requis']);
    exit;
}

$stmt = $pdo->prepare('UPDATE books SET rating = ? WHERE id = ?');
$stmt->execute([$rating ?: null, $id]);

echo json_encode(['success' => true, 'rating' => $rating ?: null]);
