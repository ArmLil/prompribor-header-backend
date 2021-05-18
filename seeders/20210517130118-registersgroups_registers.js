"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RegistersGroups_Registers", [
      //Управление, настройка и состояния контроллера
      {
        id: uuidv4(),
        registerAddress: "0x0000",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0011",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x001A",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0020",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0021",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0022",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0023",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0025",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0027",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Значения АЦП
      {
        id: uuidv4(),
        registerAddress: "0x0030",
        registersGroupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0032",
        registersGroupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Чтение\запись даты и времени
      {
        id: uuidv4(),
        registerAddress: "0x0040",
        registersGroupId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0041",
        registersGroupId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0042",
        registersGroupId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Информация о журналах
      {
        id: uuidv4(),
        registerAddress: "0x0060",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0062",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0064",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x0068",
        registersGroupId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1310",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1311",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13FB",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1399",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x139D",
        registersGroupId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RegistersGroups_Registers", null, {});
  },
};
