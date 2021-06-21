"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Registers_Controllers_values", [
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Registers_Controllers_values", null, {});
  },
};
