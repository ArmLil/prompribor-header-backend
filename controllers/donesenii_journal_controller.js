"use strict";

let db = require("../models");

async function getDonesenii_JournalData(req, res) {
  console.log("function getDonesenii_JournalData");
  try {
    let donesenii_JournalData = await db.Donesenii_Journals.findAndCountAll();

    res.json({
      donesenii_JournalData,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function getDonesenii_JournalDataById(req, res) {
  console.log("function getDonesenii_JournalDataById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const donesenii_JournalData = await db.Donesenii_Journals.findOne(options);
    if (donesenii_JournalData == null) {
      return res.status(400).send({
        message: `Donesenii_JournalData by id ${req.params.id} not found`,
      });
    }
    res.json(donesenii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createDonesenii_JournalData(req, res) {
  console.log("function createDonesenii_JournalData", req.body);
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
      let hh =
        String(currentdate.getHours()).length > 1
          ? String(currentdate.getHours())
          : "0" + String(currentdate.getHours());
      let min =
        String(currentdate.getMinutes()).length > 1
          ? String(currentdate.getMinutes())
          : "0" + String(currentdate.getMinutes());
      let time = hh + ":" + min;
      options.time = req.body.time;
    } else {
      let hh = currentdate.getHours();
      let min = currentdate.getMinutes();

      let time = currentdate.getHours() + ":" + currentdate.getMinutes();
      // ":" +
      // currentdate.getSeconds();
      options.time = time;
    }
    if (req.body.fromWho) {
      options.fromWho = req.body.fromWho;
    }

    if (req.body.donesenii) {
      options.donesenii = req.body.donesenii;
    } else {
      return res.status(400).send({ message: "donesenii required" });
    }
    if (req.body.executor) {
      options.executor = req.body.executor;
    }
    if (req.body.note) {
      options.note = req.body.note;
    }
    if (req.body.commCenterId) {
      options.commCenterId = req.body.commCenterId;
    } else {
      return res.status(400).send({ message: "commCenterId required" });
    }
    const donesenii_JournalData = await db.Donesenii_Journals.create(options);

    res.json(donesenii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function updateDonesenii_Journal(req, res) {
  console.log("function updateDonesenii_Journal");
  try {
    const donesenii_JournalData = await db.Donesenii_Journals.findByPk(
      req.params.id
    );
    if (donesenii_JournalData == null) {
      return res.status(400).send({
        message: `Donesenii_Journal by id ${req.params.id} not found`,
      });
    }
    if (req.body.date) {
      donesenii_JournalData.date = req.body.date;
    }
    if (req.body.time) {
      donesenii_JournalData.time = req.body.time;
    }
    if (req.body.fromWho) {
      donesenii_JournalData.fromWho = req.body.fromWho;
    }
    if (req.body.donesenii) {
      donesenii_JournalData.donesenii = req.body.donesenii;
    }
    if (req.body.executor) {
      donesenii_JournalData.executor = req.body.executor;
    }
    if (req.body.note) {
      donesenii_JournalData.note = req.body.note;
    }

    await donesenii_JournalData.save();
    res.json(donesenii_JournalData);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteDonesenii_Journal(req, res) {
  console.log("function deleteDonesenii_Journal");
  try {
    const donesenii_JournalData = await db.Donesenii_Journals.findByPk(
      req.params.id
    );
    if (donesenii_JournalData == null) {
      return res.status(400).send({
        message: `Donesenii_Journal by address ${req.params.id} not found`,
      });
    }
    await donesenii_JournalData.destroy();
    res.json({
      massage: `donesenii_JournalData with id ${donesenii_JournalData.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getDonesenii_JournalData,
  getDonesenii_JournalDataById,
  createDonesenii_JournalData,
  updateDonesenii_Journal,
  deleteDonesenii_Journal,
};
