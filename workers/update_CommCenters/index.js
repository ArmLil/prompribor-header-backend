"use strict";
var db = require("../../models");
var line = require("../../config/config.js")["line"];
const update_commCenters = async (io) => {
  console.log("update_commCenters");
  try {
    let options = {};

    options.include = [
      {
        model: db.Controllers,
        as: "controllers",
        include: [
          {
            model: db.Registers,
            as: "registers",
          },
        ],
      },
    ];
    let commCenters = await db.CommunicationCenters.findAndCountAll(options);
    await io.emit("updateMapCommCenters", commCenters.rows);
  } catch (err) {
    console.error(err);
  }
};
module.exports = update_commCenters;
