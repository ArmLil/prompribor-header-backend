"use strict";

let db = require("../models");

async function getAvarii_JournalData(req, res) {
  console.log("function getAvarii_JournalData");
  try {
    let avarii_JournalData = await db.Avarii_Journals.findAndCountAll();

    res.json({
      avarii_JournalData,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function getAvarii_JournalDataById(req, res) {
  console.log("function getAvarii_JournalDataById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const avarii_JournalData = await db.Avarii_Journals.findOne(options);
    if (avarii_JournalData == null) {
      return res.status(400).send({
        message: `Avarii_JournalData by id ${req.params.id} not found`,
      });
    }
    res.json(avarii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createAvarii_JournalData(req, res) {
  console.log("function createAvarii_JournalData", req.body);
  try {
    let options = {};
    let currentdate = new Date();

    if (req.body.date) {
      options.date = req.body.date;
    } else {
      const dd = String(currentdate.getDate()).padStart(2, "0");
      const mm = String(currentdate.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = currentdate.getFullYear();

      let date = dd + "-" + mm + "-" + yyyy;
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
    if (req.body.fromWho) {
      options.fromWho = req.body.fromWho;
    }
    if (req.body.avarii) {
      options.avarii = req.body.avarii;
    } else {
      return res.status(400).send({ message: "avarii required" });
    }
    if (req.body.executor) {
      options.executor = req.body.executor;
    }
    if (req.body.note) {
      options.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      options.commCenterPath = req.body.commCenterPath;
    } else {
      return res.status(400).send({ message: "commCenterPath required" });
    }
    const avarii_JournalData = await db.Avarii_Journals.create(options);

    res.json(avarii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function updateAvarii_Journal(req, res) {
  console.log("function updateAvarii_Journal");
  try {
    const avarii_JournalData = await db.Avarii_Journals.findByPk(req.params.id);
    if (avarii_JournalData == null) {
      return res
        .status(400)
        .send({ message: `Avarii_Journal by id ${req.params.id} not found` });
    }
    if (req.body.date) {
      avarii_JournalData.date = req.body.date;
    }
    if (req.body.time) {
      avarii_JournalData.time = req.body.time;
    }
    if (req.body.fromWho) {
      avarii_JournalData.fromWho = req.body.fromWho;
    }
    if (req.body.avarii) {
      avarii_JournalData.avarii = req.body.avarii;
    }
    if (req.body.executor) {
      avarii_JournalData.executor = req.body.executor;
    }
    if (req.body.note) {
      avarii_JournalData.note = req.body.note;
    }
    if (req.body.commCenterPath) {
      avarii_JournalData.commCenterPath = req.body.commCenterPath;
    }

    await avarii_JournalData.save();
    res.json(avarii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteAvarii_Journal(req, res) {
  console.log("function deleteAvarii_Journal");
  try {
    const avarii_JournalData = await db.Avarii_Journals.findByPk(req.params.id);
    if (avarii_JournalData == null) {
      return res.status(400).send({
        message: `Avarii_Journal by address ${req.params.id} not found`,
      });
    }
    await avarii_JournalData.destroy();
    res.json({
      massage: `avarii_JournalData with id ${avarii_JournalData.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getAvarii_JournalData,
  getAvarii_JournalDataById,
  createAvarii_JournalData,
  updateAvarii_Journal,
  deleteAvarii_Journal,
};
