"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("urls", "visits", {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("urls", "visits", {
      type: Sequelize.DataTypes.INTEGER,
    });
  },
};
