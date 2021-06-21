"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Controllers", [
      //Информация о журналах
      {
        modbusId: "1",
        name: "ГНС-2",
        description: "Начальный пункт ПМТП-150 (в районе оз. Великое)",
        commCenterPath: "GNS2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modbusId: "2",
        name: "ГНС-1",
        description: "Конечный пункт ПМТП-150 (старый трубопроводный полигон)",
        commCenterPath: "GNS1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Controllers", null, {});
  },
};
