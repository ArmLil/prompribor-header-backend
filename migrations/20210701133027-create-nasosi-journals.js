"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Nasosi_Journals", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      date: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      line: {
        type: Sequelize.STRING,
      },
      P_in: {
        type: Sequelize.STRING,
      },
      P_out: {
        type: Sequelize.STRING,
      },
      revs: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      commCenterId: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("Nasosi_Journals");
  },
};
