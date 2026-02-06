<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = (int) ($data['id'] ?? 0);

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID requis']);
    exit;
}

$stmt = $pdo->prepare('UPDATE books SET is_read = NOT is_read WHERE id = ?');
$stmt->execute([$id]);

$stmt = $pdo->prepare('SELECT is_read FROM books WHERE id = ?');
$stmt->execute([$id]);
$book = $stmt->fetch();

echo json_encode(['success' => true, 'is_read' => (bool) $book['is_read']]);
