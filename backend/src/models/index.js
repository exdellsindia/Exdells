const sequelize = require('../config/db');
const UserFactory = require('./User');
const LeadFactory = require('./Lead');
const ProjectFactory = require('./Project');

const User = UserFactory(sequelize);
const Lead = LeadFactory(sequelize);
const Project = ProjectFactory(sequelize);

module.exports = { sequelize, User, Lead, Project };
