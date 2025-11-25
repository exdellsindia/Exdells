const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const User = require('./User')(sequelize)
const Lead = require('./Lead')(sequelize)
const Project = require('./Project')(sequelize)

module.exports = { sequelize, User, Lead, Project }
