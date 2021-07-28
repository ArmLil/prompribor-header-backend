"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RegistersGroups", [
      // возле озеро
      {
        id: 1,
        name: "Состояние насоса",
        relatedJournal: "nasosi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // возле леса
      {
        id: 2,
        name: "Учет нефтепродукта",
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
