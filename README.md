# Trouve ton artisan - Auvergne-Rhône-Alpes

Plateforme dédiée aux particuliers pour trouver et contacter facilement un artisan de la région. Ce projet est divisé en deux parties : un front-end en React.js (Vite) et une API back-end sous Node.js/Express avec une base de données MySQL.

## Prérequis
- Node.js (version 16 ou supérieure)
- Serveur MySQL (ex: WAMP, XAMPP, ou serveur dédié)
- Git

## Installation et lancement

### 1. Base de données
- Créez une base de données nommée `trouve_ton_artisan` dans votre environnement MySQL.
- Le script de création et d'alimentation complet (`.sql`) se trouve à la racine du dépôt. Vous pouvez l'importer dans votre base, ou laisser la synchronisation Sequelize du back-end générer les tables au premier lancement.

### 2. Back-end (API)
- Naviguez dans le dossier du back-end.
- Installez les dépendances : `npm install`
- Configurez le fichier `.env` avec vos identifiants de base de données (`PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`).
- Lancez le serveur : `node server.js`
- Le serveur tournera sur `http://localhost:5000`.

### 3. Front-end (React)
- Naviguez dans le dossier du front-end.
- Installez les dépendances : `npm install`
- Lancez l'environnement de développement : `npm run dev`
- Ouvrez le lien fourni dans le terminal (généralement `http://localhost:5173`) dans votre navigateur.