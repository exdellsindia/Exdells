require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: process.env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : undefined
  });
  console.log('Using Postgres DB via DATABASE_URL');
} else {
  const storage = path.join(__dirname, '../../backend_dev.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: false
  });
  console.log(`Using SQLite DB at ${storage}`);
}

module.exports = sequelize;
