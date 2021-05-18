"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Controller_RegistersGroups", [
      //Информация о журналах
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS1",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "GNS2",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Controller_RegistersGroups", null, {});
  },
};
