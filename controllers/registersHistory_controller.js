"use strict";

let db = require("../models");

//these are just standard methods, needs to be edited and expanded
async function getRegistersHistory(req, res) {
  console.log("function getRegistersHistory");
  try {
    let options = {};
    let registersHistory = await db.RegistersHistory.findAndCountAll(options);
    let count = registersHistory.count;

    res.json({
      registersHistory,
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getRegistersHistoryById(req, res) {
  console.log("function getRegistersHistoryById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    const registersHistory = await db.RegistersHistory.findOne(options);
    if (registersHistory == null) {
      return res.status(400).send({
        "Bad Request": "registersHistory by this id not found"
      });
    }
    res.json(registersHistory);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function createRegistersHistory(req, res) {
  console.log("function createRegistersHistory", req.body);
  try {
    let options = {};

    if (req.body.controllerId && req.body.registerId && req.body.value) {
      const controller = await db.Controllers.findByPk(req.body.controllerId);
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `controller by id ${req.body.controllerId} not found`
        });
      }

      const register = await db.Registers.findByPk(req.body.registerId);
      if (register == null) {
        return res.status(400).send({
          "Bad Request": `register by id ${req.body.registerId} not found`
        });
      }

      options.controllerId = req.body.controllerId;
      options.registerId = req.body.registerId;
      options.value = req.body.value;
    } else {
      return res.status(400).send({
        "Bad Request": ` controllerId, registerId, value required in body`
      });
    }

    const registersHistory = await db.RegistersHistory.create(options);
    await db.RegistersHistory_full.create(options);

    res.json(registersHistory);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function updateRegistersHistory(req, res) {
  console.log("function updateRegistersHistory");
  try {
    const registersHistory = await db.RegistersHistory.findByPk(req.params.id);
    if (registersHistory == null) {
      return res.status(400).send({
        "Bad Request": `RegistersHistory by ${req.params.id} id not found`
      });
    }
    if (req.body.value == undefined) {
      return res.status(400).send({
        "Bad Request": ` value required`
      });
    }
    let _controllerId = registersHistory.controllerId;
    let _registerId = registersHistory.registerId;
    if (req.body.controllerId) {
      const controller = await db.Controllers.findByPk(req.body.controllerId);
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `Controller by id ${req.body.controllerId} not found`
        });
      }
      _controllerId = req.body.controllerId;
    }
    if (req.body.registerId) {
      const register = await db.Registers.findByPk(req.body.registerId);
      if (register == null) {
        return res.status(400).send({
          "Bad Request": `RegistersGroup by id ${req.body.registerId} not found`
        });
      }
      _registerId = req.body.registerId;
    }

    registersHistory.controllerId = _controllerId;
    registersHistory.registerId = _registerId;
    registersHistory.value = req.body.value;

    await registersHistory.save();
    res.json(registersHistory);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteRegistersHistory(req, res) {
  console.log("function deleteRegistersHistory");
  try {
    const registersHistory = await db.RegistersHistory.findByPk(req.params.id);
    if (registersHistory == null) {
      return res.status(400).send({
        "Bad Request": "RegistersHistory by this id not found"
      });
    }
    await registersHistory.destroy();
    res.json({
      massage: `RegistersHistory with id ${registersHistory.id} deleted`
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getRegistersHistory,
  getRegistersHistoryById,
  createRegistersHistory,
  updateRegistersHistory,
  deleteRegistersHistory
};
