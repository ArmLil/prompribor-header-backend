"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "MapPolylinePoints",
      [
        {
          id: uuidv4(),
          index: "200",
          lat: "56.284067",
          len: "42.73085",
          type: "commCenter",
          description: "ГНС-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          index: "101",
          lat: "56.298119030271884",
          len: "42.69747903460672",
          type: "middlePoint",
          description: "ГНС-1,ГНС-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          index: "102",
          lat: "56.2948327769903",
          len: "42.71240785375273",
          type: "middlePoint",
          description: "ГНС-1,ГНС-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          index: "103",
          lat: "56.28752100820184",
          len: "42.72038724745659",
          type: "middlePoint",
          description: "ГНС-1,ГНС-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          index: "100",
          lat: "56.302167",
          len: "42.68865",
          type: "commCenter",
          description: "ГНС-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("MapPolylinePoints", null, {});
  },
};
