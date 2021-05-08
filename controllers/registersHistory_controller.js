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
      count,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function getRegistersHistoryById(req, res) {
  console.log("function getRegistersHistoryById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const registersHistory = await db.RegistersHistory.findOne(options);
    if (registersHistory == null) {
      return res.status(400).send({
        "message": "registersHistory by this id not found",
      });
    }
    res.json(registersHistory);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function createRegistersHistory(req, res) {
  console.log("function createRegistersHistory", req.body);
  try {
    let options = {};

    if (
      req.body.controllerModbusId &&
      req.body.registerAddress &&
      req.body.value
    ) {
      const controller = await db.Controllers.findOne({
        where: { modbusId: req.body.controllerModbusId },
      });
      if (controller == null) {
        return res.status(400).send({
          "message": `controller by modbusId ${req.body.controllerModbusId} not found`,
        });
      }

      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          "message": `register by address ${req.body.registerAddress} not found`,
        });
      }

      options.controllerModbusId = req.body.controllerModbusId;
      options.registerAddress = req.body.registerAddress;
      options.value = req.body.value;
    } else {
      return res.status(400).send({
        "message": ` controllerModbusId, registerAddress, value required in body`,
      });
    }

    const registersHistory = await db.RegistersHistory.create(options);
    await db.RegistersHistory_full.create(options);

    res.json(registersHistory);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function updateRegistersHistory(req, res) {
  console.log("function updateRegistersHistory");
  try {
    const registersHistory = await db.RegistersHistory.findByPk(req.params.id);
    if (registersHistory == null) {
      return res.status(400).send({
        "message": `RegistersHistory by ${req.params.id} id not found`,
      });
    }
    if (req.body.value == undefined) {
      return res.status(400).send({
        "message": ` value required`,
      });
    }
    let _controllerModbusId = registersHistory.controllerModbusId;
    let _registerAddress = registersHistory.registerAddress;
    if (req.body.controllerModbusId) {
      const controller = await db.Controllers.findOne({
        where: { modbusId: req.body.controllerModbusId },
      });
      if (controller == null) {
        return res.status(400).send({
          "message": `Controller by modbusId ${req.body.controllerModbusId} not found`,
        });
      }
      _controllerModbusId = req.body.controllerModbusId;
    }
    if (req.body.registerAddress) {
      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          "message": `RegistersGroup by address ${req.body.registerAddress} not found`,
        });
      }
      _registerAddress = req.body.registerAddress;
    }

    registersHistory.controllerModbusId = _controllerModbusId;
    registersHistory.registerAddress = _registerAddress;
    registersHistory.value = req.body.value;

    await registersHistory.save();
    res.json(registersHistory);
  } catch (err) {
    console.error(err);
    res.json({ message: err });
  }
}

async function deleteRegistersHistory(req, res) {
  console.log("function deleteRegistersHistory");
  try {
    const registersHistory = await db.RegistersHistory.findByPk(req.params.id);
    if (registersHistory == null) {
      return res.status(400).send({
        "message": "RegistersHistory by this id not found",
      });
    }
    await registersHistory.destroy();
    res.json({
      massage: `RegistersHistory with id ${registersHistory.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: err });
  }
}

module.exports = {
  getRegistersHistory,
  getRegistersHistoryById,
  createRegistersHistory,
  updateRegistersHistory,
  deleteRegistersHistory,
};
