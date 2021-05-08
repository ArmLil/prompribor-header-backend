"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CommunicationCenters", {
      path: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      index: {
        type: Sequelize.INTEGER,
      },
      lat: {
        type: Sequelize.STRING,
      },
      len: {
        type: Sequelize.STRING,
      },
      port: {
        type: Sequelize.STRING,
      },
      host: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CommunicationCenters");
  },
};
