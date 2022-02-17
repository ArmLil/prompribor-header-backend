"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Controllers", {
      modbusId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      line: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      commCenterPath: {
        type: Sequelize.STRING,
      },
      commCenterId: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "offline",
      },
      programmStatus: {
        type: Sequelize.STRING,
        defaultValue: "offline",
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
    return queryInterface.dropTable("Controllers");
  },
};
