"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CommunicationCenters", [
      //Информация о журналах
      {
        path: "GNS2",
        name: "ГНС-2",
        index: 1,
        lat: "56.302167",
        len: "42.68865",
        port: "",
        host: "",
        description: "Начальный пункт ПМТП-150 (в районе оз. Великое)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS1",
        name: "ГНС-1",
        index: 2,
        lat: "56.284067",
        len: "42.73085",
        port: "",
        host: "",
        description:
          "Конечный пункт ПМТП-150 (старый трубопроводный полигон),  размещается на трассе ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CommunicationCenters", null, {});
  },
};
