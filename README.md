# Ma Bibliothèque

Application web de gestion de bibliothèque personnelle avec challenge de lecture.

## Fonctionnalités

- **Catalogue de livres** : parcourir, ajouter et supprimer des livres
- **Marquer comme lu** : suivre ses lectures
- **Challenge de lecture** : se fixer un objectif annuel et suivre sa progression
- **Livre aléatoire** : obtenir une suggestion par genre
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
│   ├── challenge.php             # CRUD challenge
│   └── seed.php                  # Import initial des livres
└── .github/workflows/
    └── deploy.yml                # Déploiement automatique
```
