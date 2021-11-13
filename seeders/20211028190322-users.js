"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      //Состояние насоса
      {
        id: uuidv4(),
        username: "Админ",
        name: "Админ",
        secondName: "Админ",
        isAdmin: true,
        password:
          "$2b$10$0s34EzCp4GsCdWe1oAbFX.RMvBd9jmEaPq1209SgT1H0eSn5ehf8y",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    Users;
    return queryInterface.bulkDelete("Users", null, {});
  },
};
