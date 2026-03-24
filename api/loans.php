<?php
require_once __DIR__ . '/config.php';

// Create table if not exists
$pdo->exec("CREATE TABLE IF NOT EXISTS loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    person VARCHAR(255) NOT NULL,
    loan_date DATE NOT NULL,
    returned_date DATE DEFAULT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
)");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('
            SELECT l.id, l.book_id, l.person, l.loan_date, l.returned_date,
                   b.title, b.author
            FROM loans l
            JOIN books b ON b.id = l.book_id
            ORDER BY l.returned_date IS NOT NULL, l.loan_date DESC
        ');
        $loans = $stmt->fetchAll();
        foreach ($loans as &$loan) {
            $loan['id'] = (int) $loan['id'];
            $loan['book_id'] = (int) $loan['book_id'];
        }
        echo json_encode($loans);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $action = $data['action'] ?? 'create';

        if ($action === 'return') {
            $id = (int) ($data['id'] ?? 0);
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'ID requis']);
                exit;
            }
            $stmt = $pdo->prepare('UPDATE loans SET returned_date = CURDATE() WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
        }

        $book_id = (int) ($data['book_id'] ?? 0);
        $person = trim($data['person'] ?? '');
        $loan_date = $data['loan_date'] ?? date('Y-m-d');

        if (!$book_id || !$person) {
            http_response_code(400);
            echo json_encode(['error' => 'Livre et personne requis']);
            exit;
        }

        $stmt = $pdo->prepare('INSERT INTO loans (book_id, person, loan_date) VALUES (?, ?, ?)');
        $stmt->execute([$book_id, $person, $loan_date]);
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
        $stmt = $pdo->prepare('DELETE FROM loans WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => $stmt->rowCount() > 0]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}
