"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Registers_Controllers_values", [
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1310",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1311",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13FB",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1399",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x139D",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Значения АЦП
      {
        id: uuidv4(),
        registerAddress: "0x0030",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0032",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0060",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0062",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0064",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0068",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0020",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0021",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0022",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0023",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0025",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0027",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Управление, настройка и состояния контроллера
      {
        id: uuidv4(),
        registerAddress: "0x0000",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0011",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x001A",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Чтение\запись даты и времени
      {
        id: uuidv4(),
        registerAddress: "0x0040",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0041",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0042",
        controllerModbusId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1310",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1311",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
        registerAddress: "0x13FB",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1399",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x139D",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Значения АЦП
      {
        id: uuidv4(),
        registerAddress: "0x0030",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0032",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0060",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0062",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0064",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0068",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0020",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0021",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0022",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0023",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0025",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0027",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Управление, настройка и состояния контроллера
      {
        id: uuidv4(),
        registerAddress: "0x0000",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0011",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x001A",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Чтение\запись даты и времени
      {
        id: uuidv4(),
        registerAddress: "0x0040",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0041",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0042",
        controllerModbusId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Registers_Controllers_values", null, {});
  },
};