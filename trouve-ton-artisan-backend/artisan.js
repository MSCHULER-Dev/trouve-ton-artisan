const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Categorie = require('./categorie');
const Specialiste = require('./specialiste');

const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    entreprise: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code_postal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0.0
    },
    a_propos: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'artisans',
    timestamps: true
});

// Associations Sequelize
Categorie.hasMany(Artisan, { foreignKey: 'categorieId', onDelete: 'CASCADE' });
Artisan.belongsTo(Categorie, { foreignKey: 'categorieId' });

Specialiste.hasMany(Artisan, { foreignKey: 'specialisteId', onDelete: 'SET NULL' });
Artisan.belongsTo(Specialiste, { foreignKey: 'specialisteId' });

module.exports = Artisan;