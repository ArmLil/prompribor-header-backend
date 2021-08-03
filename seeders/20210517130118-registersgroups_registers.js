"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("RegistersGroups_Registers", [
      //Состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        registersGroupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Состояние горючего
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        registersGroupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RegistersGroups_Registers", null, {});
  },
};
