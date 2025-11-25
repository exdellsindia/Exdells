const sequelize = require('../config/db');
const User = require('./User');
const Lead = require('./Lead');
const Project = require('./Project');

// register models (calling factory functions)
User(sequelize);
Lead(sequelize);
Project(sequelize);

module.exports = { sequelize };
