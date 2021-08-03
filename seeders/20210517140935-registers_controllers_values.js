"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Registers_Controllers_values", [
      //commCenter 1
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "1.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "1.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "1.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "1.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 2
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "2.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "2.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "2.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "2.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 3
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "3.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "3.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "3.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "3.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 4
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "4.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "4.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 5
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "5.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "5.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "5.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "5.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 6
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "6.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "6.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "6.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "6.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //commCenter 7
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: "7.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: "7.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: "7.1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: "7.2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Registers_Controllers_values", null, {});
  },
};
