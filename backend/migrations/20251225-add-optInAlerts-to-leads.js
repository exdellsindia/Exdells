"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sequelize migration: add optInAlerts column to Leads table
    // This migration adds a boolean column for weekly alert opt-in.
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
