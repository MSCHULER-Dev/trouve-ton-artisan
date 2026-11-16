const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Specialiste = sequelize.define('Specialiste', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'specialistes',
    timestamps: true
});

module.exports = Specialiste;