const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });

    // Return model for use in app
    return User;
  };
  // Sequelize model for User (authentication)

  return User;
};


