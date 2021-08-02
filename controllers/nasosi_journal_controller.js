"use strict";

let db = require("../models");

async function getNasosi_JournalData(req, res) {
  console.log("function getNasosi_JournalData");
  try {
    let nasosi_JournalData = await db.Nasosi_Journals.findAndCountAll();

    res.json({
      nasosi_JournalData,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function getNasosi_JournalDataById(req, res) {
  console.log("function getNasosi_JournalDataById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const nasosi_JournalData = await db.Nasosi_Journals.findOne(options);
    if (nasosi_JournalData == null) {
      return res.status(400).send({
        message: `Nasosi_JournalData by id ${req.params.id} not found`,
      });
    }
    res.json(nasosi_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createNasosi_JournalData(req, res) {
  console.log("function createNasosi_JournalData", req.body);
  try {
    let options = {};
    let currentdate = new Date();

    if (req.body.date) {
      let hh =
        String(currentdate.getHours()).length > 1
          ? String(currentdate.getHours())
          : "0" + String(currentdate.getHours());
      let min =
        String(currentdate.getMinutes()).length > 1
          ? String(currentdate.getMinutes())
          : "0" + String(currentdate.getMinutes());
      let time = hh + ":" + min;
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
    if (req.body.line) {
      console.log("req.body", req.body.line);
      options.line = req.body.line;
    } else {
      return res.status(400).send({ message: "line required" });
    }
    if (req.body.P_in) {
      options.P_in = req.body.P_in;
    } else {
      return res.status(400).send({ message: "P_in required" });
    }
    if (req.body.P_out) {
      options.P_out = req.body.P_out;
    } else {
      return res.status(400).send({ message: "P_out required" });
    }
    if (req.body.revs) {
      options.revs = req.body.revs;
    } else {
      return res.status(400).send({ message: "revs required" });
    }
    if (req.body.note) {
      options.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      options.commCenterPath = req.body.commCenterPath;
    } else {
      return res.status(400).send({ message: "commCenterPath required" });
    }
    const nasosi_JournalData = await db.Nasosi_Journals.create(options);

    res.json(nasosi_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function updateNasosi_Journal(req, res) {
  console.log("function updateNasosi_Journal");
  try {
    const nasosi_JournalData = await db.Nasosi_Journals.findByPk(req.params.id);
    if (nasosi_JournalData == null) {
      return res
        .status(400)
        .send({ message: `Nasosi_Journal by id ${req.params.id} not found` });
    }
    if (req.body.date) {
      nasosi_JournalData.date = req.body.date;
    }
    if (req.body.time) {
      nasosi_JournalData.time = req.body.time;
    }
    if (req.body.line) {
      nasosi_JournalData.line = req.body.line;
    }
    if (req.body.P_in) {
      nasosi_JournalData.P_in = req.body.P_in;
    }
    if (req.body.P_out) {
      nasosi_JournalData.P_out = req.body.P_out;
    }
    if (req.body.revs) {
      nasosi_JournalData.revs = req.body.revs;
    }
    if (req.body.note) {
      nasosi_JournalData.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      nasosi_JournalData.commCenterPath = req.body.commCenterPath;
    }

    await nasosi_JournalData.save();
    res.json(nasosi_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteNasosi_Journal(req, res) {
  console.log("function deleteNasosi_Journal");
  try {
    const nasosi_JournalData = await db.Nasosi_Journals.findByPk(req.params.id);
    if (nasosi_JournalData == null) {
      return res.status(400).send({
        message: `Nasosi_Journal by address ${req.params.id} not found`,
      });
    }
    await nasosi_JournalData.destroy();
    res.json({
      massage: `nasosi_JournalData with id ${nasosi_JournalData.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getNasosi_JournalData,
  getNasosi_JournalDataById,
  createNasosi_JournalData,
  updateNasosi_Journal,
  deleteNasosi_Journal,
};
