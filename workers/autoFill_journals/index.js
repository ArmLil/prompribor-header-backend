"use strict";
var db = require("../../models");

const fill_journals = async (io) => {
  console.log("fill journals");
  //fill nasosi journals

  let commCenters = await db.CommunicationCenters.findAndCountAll({
    include: [
      { model: db.Nasosi_Journals, as: "nasosi_journal_data" },
      { model: db.Fuel_Journals, as: "fuel_journal_data" },
    ],
  });
  // console.log(commCenters.rows);
  commCenters.rows.forEach(async (commCenter, i) => {
    let options = {
      where: {
        commCenterPath: commCenter.path,
      },
      include: [
        { model: db.CommunicationCenters, as: "commCenter" },
        { model: db.Registers_Controllers_values, as: "values" },
        {
          model: db.RegistersGroups,
          as: "registersGroups",
          include: [
            {
              model: db.Registers,
              as: "registers",
            },
          ],
        },
      ],
    };

    const controllers = await db.Controllers.findAll(options);
    let result_controllers = [];
    controllers.forEach((contr, i) => {
      let { values, registersGroups } = contr;
      if (registersGroups)
        registersGroups = registersGroups.map((gr, i) => {
          if (gr.registers)
            gr.registers.forEach((reg) => {
              if (values)
                values.forEach((val, i) => {
                  if (reg.address == val.registerAddress) {
                    reg.dataValues.value = val.value;
                  }
                });
            });
          return gr;
        });
      contr.registersGroup = registersGroups;
      result_controllers.push(contr);
    });
    // console.log({ result_controllers });
    result_controllers.forEach((res_cont, i) => {
      res_cont.registersGroups.forEach((reg_gr, i) => {
        // console.log({ reg_gr });
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
        options.commCenterPath = commCenter.path;
        if (reg_gr.relatedJournal === "fuel") {
          reg_gr.registers.forEach((reg, i) => {
            if (reg.name === "temperature") {
              options.temperature = reg.dataValues.value;
            }
            if (reg.name === "density") {
              options.density = reg.dataValues.value;
            }
            if (reg.name === "current_volume") {
              options.current_volume = reg.dataValues.value;
            }
            if (reg.name === "current_mass") {
              options.current_mass = reg.dataValues.value;
            }
            if (reg.name === "total_volume") {
              options.total_volume = reg.dataValues.value;
            }
            if (reg.name === "total_mass") {
              options.total_mass = reg.dataValues.value;
            }
          });

          db.Fuel_Journals.create(options);
        }
        if (reg_gr.relatedJournal === "nasosi") {
          reg_gr.registers.forEach((reg, i) => {
            options.line = res_cont.line;
            if (reg.name === "P_in") {
              options.P_in = reg.dataValues.value;
            }
            if (reg.name === "P_out") {
              options.P_out = reg.dataValues.value;
            }
            if (reg.name === "revs") {
              options.revs = reg.dataValues.value;
            }
          });

          db.Nasosi_Journals.create(options);
        }
      });
    });
  });
};
module.exports = fill_journals;
