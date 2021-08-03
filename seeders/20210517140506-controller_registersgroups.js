"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Controller_RegistersGroups", [
      //*.1 Состояние насоса
      //*.2 Состояние горючего

      //состояние насоса
      {
        id: uuidv4(),
        controllerModbusId: "1.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //состояние горючего
      {
        id: uuidv4(),
        controllerModbusId: "1.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      /////2
      {
        id: uuidv4(),
        controllerModbusId: "2.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "2.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ////3
      {
        id: uuidv4(),
        controllerModbusId: "3.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "3.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //4
      {
        id: uuidv4(),
        controllerModbusId: "4.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "4.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //5
      {
        id: uuidv4(),
        controllerModbusId: "5.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "5.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //6
      {
        id: uuidv4(),
        controllerModbusId: "6.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "6.2",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //7
      {
        id: uuidv4(),
        controllerModbusId: "7.1",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        controllerModbusId: "7.2",
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
