"use strict";

let db = require("../models");

async function getFuel_JournalData(req, res) {
  console.log("function getFuel_JournalData");
  try {
    let fuel_JournalData = await db.Fuel_Journals.findAndCountAll();

    res.json({
      fuel_JournalData,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function getFuel_JournalDataById(req, res) {
  console.log("function getFuel_JournalDataById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const fuel_JournalData = await db.Fuel_Journals.findOne(options);
    if (fuel_JournalData == null) {
      return res.status(400).send({
        message: `Fuel_JournalData by id ${req.params.id} not found`,
      });
    }
    res.json(fuel_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createFuel_JournalData(req, res) {
  console.log("function createFuel_JournalData", req.body);
  try {
    let options = {};
    let currentdate = new Date();

    if (req.body.date) {
      options.date = req.body.date;
    } else {
      const dd = String(currentdate.getDate()).padStart(2, "0");
      const mm = String(currentdate.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = currentdate.getFullYear();

      let date = dd + "." + mm + "." + yyyy;
      options.date = date;
    }
    if (req.body.time) {
      options.time = req.body.time;
    } else {
      let time = currentdate.getHours() + ":" + currentdate.getMinutes();
      // ":" +
      // currentdate.getSeconds();
      options.time = time;
    }
    if (req.body.temperature) {
      console.log("req.body", req.body.temperature);
      options.temperature = req.body.temperature;
    }
    if (req.body.density) {
      options.density = req.body.density;
    }
    if (req.body.current_volume) {
      options.current_volume = req.body.current_volume;
    }
    if (req.body.current_mass) {
      options.current_mass = req.body.current_mass;
    }
    if (req.body.total_volume) {
      options.total_volume = req.body.total_volume;
    }
    if (req.body.total_mass) {
      options.total_mass = req.body.total_mass;
    }
    if (req.body.note) {
      options.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      options.commCenterPath = req.body.commCenterPath;
    } else {
      return res.status(400).send({ message: "commCenterPath required" });
    }
    const fuel_JournalData = await db.Fuel_Journals.create(options);

    res.json(fuel_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function updateFuel_Journal(req, res) {
  console.log("function updateFuel_Journal");
  try {
    const fuel_JournalData = await db.Fuel_Journals.findByPk(req.params.id);
    if (fuel_JournalData == null) {
      return res
        .status(400)
        .send({ message: `Fuel_Journal by id ${req.params.id} not found` });
    }
    if (req.body.date) {
      fuel_JournalData.date = req.body.date;
    }
    if (req.body.time) {
      fuel_JournalData.time = req.body.time;
    }
    if (req.body.temperature) {
      fuel_JournalData.temperature = req.body.temperature;
    }
    if (req.body.density) {
      fuel_JournalData.density = req.body.density;
    }
    if (req.body.current_volume) {
      fuel_JournalData.current_volume = req.body.current_volume;
    }
    if (req.body.current_mass) {
      fuel_JournalData.current_mass = req.body.current_mass;
    }
    if (req.body.total_volume) {
      fuel_JournalData.total_volume = req.body.total_volume;
    }
    if (req.body.total_mass) {
      fuel_JournalData.total_mass = req.body.total_mass;
    }
    if (req.body.note) {
      fuel_JournalData.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      fuel_JournalData.commCenterPath = req.body.commCenterPath;
    }

    await fuel_JournalData.save();
    res.json(fuel_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteFuel_Journal(req, res) {
  console.log("function deleteFuel_Journal");
  try {
    const fuel_JournalData = await db.Fuel_Journals.findByPk(req.params.id);
    if (fuel_JournalData == null) {
      return res.status(400).send({
        message: `Fuel_Journal by address ${req.params.id} not found`,
      });
    }
    await fuel_JournalData.destroy();
    res.json({
      massage: `fuel_JournalData with id ${fuel_JournalData.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getFuel_JournalData,
  getFuel_JournalDataById,
  createFuel_JournalData,
  updateFuel_Journal,
  deleteFuel_Journal,
};
