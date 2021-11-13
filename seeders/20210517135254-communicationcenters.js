"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CommunicationCenters", [
      //Информация о журналах
      {
        path: "GNS1",
        name: "НС-1",
        index: 100,
        lat: "56.18388",
        len: "42.89839",
        description: "Начальный пункт",
        tablePosition: "bottom",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS2",
        name: "НС-2",
        index: 200,
        lat: "56.18701",
        len: "42.89011",
        description: "Второй пункт ",
        tablePosition: "bottom",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS3",
        name: "НС-3",
        index: 300,
        lat: "56.18937",
        len: "42.88517",
        description: "Третий пункт ",
        tablePosition: "bottom",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS4",
        name: "НС-4",
        index: 400,
        lat: "56.18832",
        len: "42.87784",
        description: "Четвертый пункт ",
        tablePosition: "bottom-right",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS5",
        name: "НС-5",
        index: 500,
        lat: "56.18541",
        len: "42.87110",
        description: "Пятый пункт(КДП) ",
        tablePosition: "bottom-left",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS6",
        name: "НС-6",
        index: 600,
        lat: "56.18698",
        len: "42.86511",
        description: "Шестой пункт ",
        tablePosition: "top-right",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        path: "GNS7",
        name: "НС-7",
        index: 700,
        lat: "56.19016",
        len: "42.85412",
        description: "Конечный пункт ",
        tablePosition: "bottom-left",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CommunicationCenters", null, {});
  },
};
