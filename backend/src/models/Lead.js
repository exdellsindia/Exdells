const { DataTypes } = require('sequelize')
module.exports = (sequelize) => sequelize.define('Lead', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  city: DataTypes.STRING,
  capacity: DataTypes.STRING,
  notes: DataTypes.TEXT,
  attachment: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'new' }
})
