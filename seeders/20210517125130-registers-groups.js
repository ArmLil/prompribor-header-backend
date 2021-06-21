"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RegistersGroups", [
      // возле озеро
      {
        id: 1,
        name: "Состояние насоса",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // возле леса
      {
        id: 2,
        name: "Учет нефтепродукта",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RegistersGroups", null, {});
  },
};
