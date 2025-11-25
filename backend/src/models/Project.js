const { DataTypes } = require('sequelize')
module.exports = (sequelize) => sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  city: DataTypes.STRING,
  size_kw: DataTypes.FLOAT,
  image: DataTypes.STRING,
  notes: DataTypes.TEXT
})
