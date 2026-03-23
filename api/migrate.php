<?php
require_once __DIR__ . '/config.php';

$migrations = [
    "ALTER TABLE books ADD COLUMN is_wishlist TINYINT(1) NOT NULL DEFAULT 0 AFTER is_gift",
    "ALTER TABLE books ADD COLUMN rating TINYINT UNSIGNED DEFAULT NULL AFTER is_wishlist",
    "ALTER TABLE books ADD COLUMN page_count INT UNSIGNED DEFAULT NULL AFTER rating",
    "ALTER TABLE books ADD COLUMN color VARCHAR(7) DEFAULT NULL AFTER page_count",
    "ALTER TABLE books ADD COLUMN size TINYINT UNSIGNED DEFAULT NULL AFTER color",
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

// Drop is_pocket if it exists (legacy column)
try {
    $pdo->exec("ALTER TABLE books DROP COLUMN is_pocket");
    $results[] = ['sql' => 'DROP COLUMN is_pocket', 'status' => 'OK'];
} catch (PDOException $e) {
    if (str_contains($e->getMessage(), "check that it exists")) {
        $results[] = ['sql' => 'DROP COLUMN is_pocket', 'status' => 'SKIP (colonne inexistante)'];
    } else {
        $results[] = ['sql' => 'DROP COLUMN is_pocket', 'status' => 'SKIP'];
    }
}

echo json_encode(['migrations' => $results], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
