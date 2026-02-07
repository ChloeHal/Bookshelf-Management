<?php
// === Configuration BDD ===
// Copier ce fichier en config.php et remplir avec vos identifiants
$host = 'localhost';
$dbname = 'VOTRE_NOM_BDD';
$user = 'VOTRE_UTILISATEUR';
$password = 'VOTRE_MOT_DE_PASSE';

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
