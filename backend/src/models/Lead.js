
// Sequelize model for Lead (form submissions)
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define Lead table structure
  const Lead = sequelize.define('Lead', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [3, 100], msg: 'Name must be between 3 and 100 characters' }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 20], msg: 'Phone must be 7-20 characters' },
        is: { args: /^[+]?\d[\d ]+$/i, msg: 'Phone must contain only digits and optional leading + or spaces' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: { msg: 'Email must be a valid email address' }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'new'
    },
    optInAlerts: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // Return model for use in app
  return Lead;
};