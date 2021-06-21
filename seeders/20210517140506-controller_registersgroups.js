"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Controller_RegistersGroups", [
      //Информация о журналах
      {
        id: uuidv4(),
        controllerModbusId: "1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //состояние насоса
      {
        id: uuidv4(),
        controllerModbusId: "2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Controller_RegistersGroups", null, {});
  },
};
