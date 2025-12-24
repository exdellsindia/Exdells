require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;


if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is NOT SET!');
} else {
  console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.slice(0, 30) + '...');
}

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
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
