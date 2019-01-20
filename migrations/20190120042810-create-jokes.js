'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jokes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      joke: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('jokes');
  }
};
