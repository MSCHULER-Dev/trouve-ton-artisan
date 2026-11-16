const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.MYSQL_ADDON_DB || 'trouve_ton_artisan',
    process.env.DB_USER || process.env.MYSQL_USER || process.env.MYSQL_ADDON_USER || 'root',
    process.env.DB_PASS || process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || process.env.MYSQL_ADDON_PASSWORD || '',
    {
        host: process.env.DB_HOST || process.env.MYSQL_HOST || process.env.MYSQL_ADDON_HOST || 'localhost',
        port: process.env.DB_PORT || process.env.MYSQL_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;
