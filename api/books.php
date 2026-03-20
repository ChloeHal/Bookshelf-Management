<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT id, title, author, genres, is_read, year, is_gift, is_wishlist, rating FROM books ORDER BY title ASC');
        $books = $stmt->fetchAll();
        foreach ($books as &$book) {
            $book['id'] = (int) $book['id'];
            $book['is_read'] = (bool) $book['is_read'];
            $book['is_gift'] = (bool) $book['is_gift'];
            $book['is_wishlist'] = (bool) $book['is_wishlist'];
            $book['rating'] = $book['rating'] ? (int) $book['rating'] : null;
            $book['year'] = $book['year'] ? (int) $book['year'] : null;
            $book['genres'] = json_decode($book['genres']);
        }
        echo json_encode($books);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $title = trim($data['title'] ?? '');
        $author = trim($data['author'] ?? '');
        $genres = $data['genres'] ?? [];
        $year = !empty($data['year']) ? (int) $data['year'] : null;
        $is_gift = !empty($data['is_gift']) ? 1 : 0;
        $is_wishlist = !empty($data['is_wishlist']) ? 1 : 0;

        if (!$title || !$author || empty($genres)) {
            http_response_code(400);
            echo json_encode(['error' => 'Titre, auteur et genres requis']);
            exit;
        }

        $stmt = $pdo->prepare('INSERT INTO books (title, author, genres, year, is_gift, is_wishlist) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$title, $author, json_encode($genres), $year, $is_gift, $is_wishlist]);

        echo json_encode(['id' => (int) $pdo->lastInsertId(), 'success' => true]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = (int) ($data['id'] ?? 0);

        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requis']);
            exit;
        }

        $stmt = $pdo->prepare('DELETE FROM books WHERE id = ?');
        $stmt->execute([$id]);

        echo json_encode(['success' => $stmt->rowCount() > 0]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}
