"use strict";
var db = require("../../models");
var line = require("../../config/config.js")["line"];
const fill_journals = async (io) => {
  console.log("fill journals");
  //fill nasosi journals
  try {
    let controllers = await db.Controllers.findAndCountAll({
      include: [{ model: db.Registers, as: "registers" }],
    });

    let options = {};
    let currentdate = new Date();
    const dd = String(currentdate.getDate()).padStart(2, "0");
    const mm = String(currentdate.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = currentdate.getFullYear();

    let date = dd + "." + mm + "." + yyyy;
    options.date = date;
    let hh =
      String(currentdate.getHours()).length > 1
        ? String(currentdate.getHours())
        : "0" + String(currentdate.getHours());
    let min =
      String(currentdate.getMinutes()).length > 1
        ? String(currentdate.getMinutes())
        : "0" + String(currentdate.getMinutes());
    let time = hh + ":" + min;
    options.time = time;

    controllers.rows.forEach(async (row, i) => {
      let contr = row.dataValues;
      options.commCenterPath = contr.commCenterPath;
      let create = false;
      contr.registers.forEach((_reg, i) => {
        let regist = _reg.dataValues;
        // console.log(regist.address);
        let value = regist.Registers_Controllers_values.dataValues.value;
        // console.log(value);
        if (value !== null) {
          create = true;
        }
        options.note =
          "последнее обнавление " +
          regist.updatedAt.toLocaleDateString("ru-RU", {
            hourCycle: "h23",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        if (regist.name === "temperature") {
          options.temperature = value;
        }
        if (regist.name === "density") {
          options.density = value;
        }
        if (regist.name === "current_volume") {
          options.current_volume = value;
        }
        if (regist.name === "current_mass") {
          options.current_mass = value;
        }
        if (regist.name === "total_volume") {
          options.total_volume = value;
        }
        if (regist.name === "total_mass") {
          options.total_mass = value;
        }
        if (regist.name === "P_in") {
          options.P_in = value;
        }
        if (regist.name === "P_out") {
          options.P_out = value;
        }
        if (regist.name === "revs") {
          options.revs = value;
        }
      });
      if (create) {
        if (contr.type === "fuel") {
          await db.Fuel_Journals.create(options)
            .then((fuel_data) => {
              io.emit("fuel_data", fuel_data);
            })
            .catch(console.error);
        }
        if (contr.type === "nasosi") {
          await db.Nasosi_Journals.create(options)
            .then((nasosi_data) => {
              io.emit("nasosi_data", nasosi_data);
            })
            .catch(console.error);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
};
module.exports = fill_journals;
