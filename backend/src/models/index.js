
// Central export for all Sequelize models
const sequelize = require('../config/db');
const UserFactory = require('./User');
const LeadFactory = require('./Lead');
const ProjectFactory = require('./Project');

// Initialize models
const User = UserFactory(sequelize);
const Lead = LeadFactory(sequelize);
const Project = ProjectFactory(sequelize);

// Export models and sequelize instance
module.exports = { sequelize, User, Lead, Project };
