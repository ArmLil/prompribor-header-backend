"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        username: "Админ",
        name: "Админ",
        secondName: "Админов",
        position: "администратор",
        isAdmin: true,
        password:
          "$2b$10$0s34EzCp4GsCdWe1oAbFX.RMvBd9jmEaPq1209SgT1H0eSn5ehf8y",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "Гость",
        name: "Иван",
        secondName: "Иванов",
        position: "оператор",
        isAdmin: false,
        password:
          "$2b$10$fmIW3NB6J7DjnxBtB2lC3um/pqox15OA5hOlGlVlRRWIkQC5XwDW2",
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
