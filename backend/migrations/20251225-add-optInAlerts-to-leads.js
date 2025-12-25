"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Leads", "optInAlerts", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Leads", "optInAlerts");
  }
};
