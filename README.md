# Ma Bibliothèque

Application web de gestion de bibliothèque personnelle avec challenge de lecture.

## Fonctionnalités

- **Bibliothèque visuelle** : étagère interactive avec tranches colorées et personnalisables
- **Catalogue de livres** : parcourir, ajouter, modifier et supprimer des livres avec filtres et tri
- **Marquer comme lu / noter** : suivre ses lectures et attribuer des notes sur 5 étoiles
- **Wishlist** : gérer une liste de livres souhaités et les marquer comme achetés
- **Challenge de lecture** : se fixer un objectif annuel, suivre sa progression avec roulette et jokers
- **Quiz lecture** : quiz en élimination directe entre genres pour trouver quoi lire
- **Emprunts** : noter qui emprunte quel livre, depuis quand, et marquer les retours
- **Statistiques** : tableaux de bord avec jauges, graphiques, records et classements
- **Base de données** : persistance via MySQL (API PHP)

## Stack technique

- **Frontend** : HTML, Tailwind CSS v4, DaisyUI v5, JavaScript vanilla
- **Backend** : PHP, MySQL (PDO)
- **Build** : Vite
- **Police** : Lexend
- **Thème** : daisysword (custom DaisyUI)

## Installation locale

```bash
npm install
npm run dev
```

Le serveur de dev proxy les appels `/api` vers `http://localhost:8000`.
Pour le backend PHP local :

```bash
php -S localhost:8000
```

## Build

```bash
npm run build
```

Les fichiers de production sont générés dans `dist/`.

## Déploiement (Hostinger)

### Prérequis

1. Créer une base de données MySQL dans hPanel
2. Exécuter `schema.sql` dans phpMyAdmin
3. Copier `api/config.example.php` en `api/config.php` et remplir les identifiants

### Déploiement manuel

1. `npm run build`
2. Copier `api/` et `.htaccess` dans `dist/`
3. Uploader le contenu de `dist/` dans `public_html/`
4. Accéder à `/api/seed.php` pour importer les livres initiaux (une seule fois)

### Déploiement automatique (GitHub Actions)

Ajouter ces secrets dans GitHub (Settings > Secrets > Actions) :

| Secret | Description |
|--------|-------------|
| `FTP_HOST` | Serveur FTP Hostinger |
| `FTP_USER` | Utilisateur FTP |
| `FTP_PASSWORD` | Mot de passe FTP |
| `DB_NAME` | Nom de la base de données |
| `DB_USER` | Utilisateur de la base de données |
| `DB_PASSWORD` | Mot de passe de la base de données |

Chaque push sur `main` déclenche le build et le déploiement automatique.

## Structure du projet

```
├── index.html                    # Page principale
├── style.css                     # Tailwind + thème DaisyUI
├── script.js                     # Logique frontend
├── vite.config.js                # Configuration Vite
├── schema.sql                    # Structure de la base de données
├── .htaccess                     # Sécurité et HTTPS
├── api/
│   ├── config.example.php        # Template de configuration BDD
│   ├── books.php                 # CRUD livres
│   ├── read.php                  # Toggle lu/non lu
│   ├── rate.php                  # Notes (1-5 étoiles)
│   ├── wishlist.php              # Wishlist (marquer comme acheté)
│   ├── challenge.php             # CRUD challenge
│   ├── loans.php                 # Gestion des emprunts
│   ├── migrate.php               # Migrations de schéma
│   └── seed.php                  # Import initial des livres
└── .github/workflows/
    └── deploy.yml                # Déploiement automatique
```
