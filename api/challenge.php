<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT id, goal, year FROM challenge ORDER BY id DESC LIMIT 1');
        $challenge = $stmt->fetch();

        if (!$challenge) {
            echo json_encode(null);
            exit;
        }

        $challenge['id'] = (int) $challenge['id'];
        $challenge['goal'] = (int) $challenge['goal'];
        $challenge['year'] = (int) $challenge['year'];

        $stmt = $pdo->prepare(
            'SELECT b.id, b.title, b.author, b.genres, b.is_read
             FROM challenge_books cb
             JOIN books b ON b.id = cb.book_id
             WHERE cb.challenge_id = ?'
        );
        $stmt->execute([$challenge['id']]);
        $books = $stmt->fetchAll();

        foreach ($books as &$book) {
            $book['id'] = (int) $book['id'];
            $book['is_read'] = (bool) $book['is_read'];
            $book['genres'] = json_decode($book['genres']);
        }

        $challenge['books'] = $books;
        echo json_encode($challenge);
        break;

    case 'POST':
        if ($action === 'add_book') {
            $data = json_decode(file_get_contents('php://input'), true);
            $bookId = (int) ($data['book_id'] ?? 0);

            $stmt = $pdo->query('SELECT id FROM challenge ORDER BY id DESC LIMIT 1');
            $challenge = $stmt->fetch();

            if (!$challenge || !$bookId) {
                http_response_code(400);
                echo json_encode(['error' => 'Challenge ou livre invalide']);
                exit;
            }

            $stmt = $pdo->prepare('INSERT IGNORE INTO challenge_books (challenge_id, book_id) VALUES (?, ?)');
            $stmt->execute([$challenge['id'], $bookId]);

            echo json_encode(['success' => true]);

        } elseif ($action === 'remove_book') {
            $data = json_decode(file_get_contents('php://input'), true);
            $bookId = (int) ($data['book_id'] ?? 0);

            $stmt = $pdo->query('SELECT id FROM challenge ORDER BY id DESC LIMIT 1');
            $challenge = $stmt->fetch();

            if (!$challenge || !$bookId) {
                http_response_code(400);
                echo json_encode(['error' => 'Challenge ou livre invalide']);
                exit;
            }

            $stmt = $pdo->prepare('DELETE FROM challenge_books WHERE challenge_id = ? AND book_id = ?');
            $stmt->execute([$challenge['id'], $bookId]);

            echo json_encode(['success' => true]);

        } else {
            // Créer un nouveau challenge
            $data = json_decode(file_get_contents('php://input'), true);
            $goal = (int) ($data['goal'] ?? 0);

            if ($goal < 1) {
                http_response_code(400);
                echo json_encode(['error' => 'Objectif invalide']);
                exit;
            }

            // Supprimer l'ancien challenge s'il existe
            $pdo->exec('DELETE FROM challenge');

            $stmt = $pdo->prepare('INSERT INTO challenge (goal, year) VALUES (?, ?)');
            $stmt->execute([$goal, (int) date('Y')]);

            echo json_encode(['id' => (int) $pdo->lastInsertId(), 'success' => true]);
        }
        break;

    case 'DELETE':
        $pdo->exec('DELETE FROM challenge');
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}
