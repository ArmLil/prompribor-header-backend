"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RegistersGroups", [
      {
        id: 1,
        name: "Состояние насоса",
        relatedJournal: "nasosi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Состояние горючего",
        relatedJournal: "fuel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RegistersGroups", null, {});
  },
};
