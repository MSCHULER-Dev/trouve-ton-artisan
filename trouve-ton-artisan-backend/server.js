const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

// Import des modèles existants
const Categorie = require('./categorie');
const Specialiste = require('./specialiste');
const Artisan = require('./artisan');

// Définition directe du modèle Contact pour le formulaire
const Contact = sequelize.define('Contact', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES API ---

app.get('/api/artisans', async (req, res) => {
    try {
        const { categorieId, specialisteId } = req.query;
        let whereClause = {};

        if (categorieId) whereClause.categorieId = categorieId;
        if (specialisteId) whereClause.specialisteId = specialisteId;

        const artisans = await Artisan.findAll({
            where: whereClause,
            include: [
                { model: Categorie },
                { model: Specialiste }
            ]
        });
        res.status(200).json(artisans);
    } catch (error) {
        console.error("Erreur lors de la récupération des artisans :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

app.get('/api/artisans/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, {
            include: [
                { model: Categorie },
                { model: Specialiste }
            ]
        });
        if (!artisan) {
            return res.status(404).json({ message: "Artisan non trouvé" });
        }
        res.status(200).json(artisan);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'artisan :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

app.get('/api/specialistes', async (req, res) => {
    try {
        const specialistes = await Specialiste.findAll();
        res.status(200).json(specialistes);
    } catch (error) {
        console.error("Erreur lors de la récupération des spécialités :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { nom, prenom, email, message } = req.body;
        if (!nom || !prenom || !email || !message) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        const nouveauContact = await Contact.create({ nom, prenom, email, message });
        res.status(201).json({ message: "Message envoyé avec succès !", contact: nouveauContact });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du contact :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// --- SYNCHRONISATION ET RE-SEEDING AUTOMATIQUE ---
sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => sequelize.sync({ force: true })) // Nettoie et recrée les tables proprement à chaque démarrage
    .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(async () => {
        console.log("Base de données synchronisée avec succès !");

        // 1. Création des 4 catégories officielles
        const catBati = await Categorie.create({ nom: 'Bâtiment' });
        const catServ = await Categorie.create({ nom: 'Services' });
        const catFab = await Categorie.create({ nom: 'Fabrication' });
        const catAlim = await Categorie.create({ nom: 'Alimentation' });

        // 2. Création des spécialités associées
        const specPlomb = await Specialiste.create({ nom: 'Plomberie' });
        const specPeint = await Specialiste.create({ nom: 'Peinture & Décoration' });
        const specElec = await Specialiste.create({ nom: 'Électricité' });
        const specJardin = await Specialiste.create({ nom: 'Jardinage & Espaces verts' });
        const specMenuis = await Specialiste.create({ nom: 'Menuiserie' });
        const specSerrur = await Specialiste.create({ nom: 'Serrurerie' });
        const specBijou = await Specialiste.create({ nom: 'Bijouterie & Joaillerie' });
        const specBoul = await Specialiste.create({ nom: 'Boulangerie & Pâtisserie' });

        // 3. Insertion des 8 artisans ancrés à Lyon
        await Artisan.bulkCreate([
            {
                nom: 'Dupont', prenom: 'Jean', entreprise: 'Rénovation Dupont',
                email: 'jean.dupont@email.com', telephone: '0612345678',
                adresse: '12 rue de la République', code_postal: '69001', ville: 'Lyon',
                note: 4.8, a_propos: 'Artisan plombier qualifié, intervention rapide pour tous dépannages et installations sanitaires à Lyon.',
                categorieId: catBati.id, specialisteId: specPlomb.id
            },
            {
                nom: 'Martin', prenom: 'Sophie', entreprise: 'SM Peinture & Déco',
                email: 'sophie.martin@email.com', telephone: '0623456789',
                adresse: '45 cours Gambetta', code_postal: '69003', ville: 'Lyon',
                note: 4.9, a_propos: 'Spécialiste de la peinture intérieure, pose de revêtements muraux et rénovation d’appartements.',
                categorieId: catBati.id, specialisteId: specPeint.id
            },
            {
                nom: 'Bernard', prenom: 'Marc', entreprise: 'MB Électricité Générale',
                email: 'marc.bernard@email.com', telephone: '0634567890',
                adresse: '8 boulevard des Belges', code_postal: '69006', ville: 'Lyon',
                note: 4.7, a_propos: 'Électricien professionnel certifié. Mise aux normes, tableaux électriques et dépannage d’urgence 7j/7.',
                categorieId: catBati.id, specialisteId: specElec.id
            },
            {
                nom: 'Leroy', prenom: 'Thomas', entreprise: 'Lyon Jardinage Services',
                email: 'thomas.leroy@email.com', telephone: '0645678901',
                adresse: '14 avenue Jean Jaurès', code_postal: '69007', ville: 'Lyon',
                note: 4.6, a_propos: 'Entretien d’espaces verts, tontes de pelouses, taille de haies et création paysagère.',
                categorieId: catServ.id, specialisteId: specJardin.id
            },
            {
                nom: 'Thomas', prenom: 'Claire', entreprise: 'CT Menuiserie Agencement',
                email: 'claire.thomas@email.com', telephone: '0656789012',
                adresse: '22 rue Victor Hugo', code_postal: '69002', ville: 'Lyon',
                note: 5.0, a_propos: 'Menuisier ébéniste, fabrication sur mesure de meubles, placards et pose de parquets.',
                categorieId: catBati.id, specialisteId: specMenuis.id
            },
            {
                nom: 'Petit', prenom: 'Lucas', entreprise: 'LP Serrurerie Lyon',
                email: 'lucas.petit@email.com', telephone: '0667890123',
                adresse: '33 cours Charlemagne', code_postal: '69002', ville: 'Lyon',
                note: 4.8, a_propos: 'Serrurier expert en ouverture de portes, blindage et remplacement de serrures toutes marques.',
                categorieId: catServ.id, specialisteId: specSerrur.id
            },
            {
                nom: 'Moreau', prenom: 'Élodie', entreprise: 'Atelier Bijoux Création',
                email: 'elodie.moreau@email.com', telephone: '0678901234',
                adresse: '15 rue Saint-Jean', code_postal: '69005', ville: 'Lyon',
                note: 4.9, a_propos: 'Création artisanale de bijoux sur mesure, réparation et transformation d’anciens bijoux en or et argent.',
                categorieId: catFab.id, specialisteId: specBijou.id
            },
            {
                nom: 'Rousseau', prenom: 'Antoine', entreprise: 'Boulangerie Artisanale Rousseau',
                email: 'antoine.rousseau@email.com', telephone: '0689012345',
                adresse: '40 rue de la Garçonnière', code_postal: '69003', ville: 'Lyon',
                note: 4.9, a_propos: 'Fabrication traditionnelle de pains au levain naturel, viennoiseries pur beurre et pâtisseries maison.',
                categorieId: catAlim.id, specialisteId: specBoul.id
            }
        ]);

        console.log("Jeu d'essai complet de 8 artisans injecté avec succès !");

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Erreur lors de la synchronisation ou du seeding :", err);
    });