<?php
// === Configuration BDD ===
// À modifier avec vos identifiants Hostinger
$host = 'localhost';
$dbname = 'u103504870_reading';
$user = 'u103504870_reading';
$password = 'o4?orOcN';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Connexion BDD échouée']);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
