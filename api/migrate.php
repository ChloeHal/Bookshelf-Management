<?php
require_once __DIR__ . '/config.php';

$migrations = [
    "ALTER TABLE books ADD COLUMN is_wishlist TINYINT(1) NOT NULL DEFAULT 0 AFTER is_gift",
    "ALTER TABLE books ADD COLUMN rating TINYINT UNSIGNED DEFAULT NULL AFTER is_wishlist",
];

$results = [];

foreach ($migrations as $sql) {
    try {
        $pdo->exec($sql);
        $results[] = ['sql' => $sql, 'status' => 'OK'];
    } catch (PDOException $e) {
        if (str_contains($e->getMessage(), 'Duplicate column name')) {
            $results[] = ['sql' => $sql, 'status' => 'SKIP (colonne existe déjà)'];
        } else {
            $results[] = ['sql' => $sql, 'status' => 'ERROR: ' . $e->getMessage()];
        }
    }
}

echo json_encode(['migrations' => $results], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
