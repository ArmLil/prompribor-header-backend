"use strict";

let db = require("../models");

//these are just standard methods, needs to be edited and expanded
async function getRegistersHistory_full(req, res) {
  console.log("function getRegistersHistory_full");
  try {
    let options = {};
    let registersHistory_full = await db.RegistersHistory_full.findAndCountAll(
      options
    );
    let count = registersHistory_full.count;

    res.json({
      registersHistory_full,
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getRegistersHistory_full_ById(req, res) {
  console.log("function getRegistersHistory_fullById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    const registersHistory_full = await db.RegistersHistory_full.findOne(
      options
    );
    if (registersHistory_full == null) {
      return res.status(400).send({
        "Bad Request": "registersHistory_full by this id not found"
      });
    }
    res.json(registersHistory_full);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function createRegistersHistory_full(req, res) {
  console.log("function createRegistersHistory_full", req.body);
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

    const registersHistory_full = await db.RegistersHistory_full.findOrCreate({
      where: options
    });

    res.json(registersHistory_full);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function updateRegistersHistory_full(req, res) {
  console.log("function updateRegistersHistory_full");
  try {
    const registersHistory_full = await db.RegistersHistory_full.findByPk(
      req.params.id
    );
    if (registersHistory_full == null) {
      return res.status(400).send({
        "Bad Request": `RegistersHistory_full by ${req.params.id} id not found`
      });
    }
    if (req.body.value == undefined) {
      return res.status(400).send({
        "Bad Request": ` value required`
      });
    }
    let _controllerId = registersHistory_full.controllerId;
    let _registerId = registersHistory_full.registerId;
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

    registersHistory_full.controllerId = _controllerId;
    registersHistory_full.registerId = _registerId;
    registersHistory_full.value = req.body.value;

    await registersHistory_full.save();
    res.json(registersHistory_full);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteRegistersHistory_full(req, res) {
  console.log("function deleteRegistersHistory_full");
  try {
    const registersHistory_full = await db.RegistersHistory_full.findByPk(
      req.params.id
    );
    if (registersHistory_full == null) {
      return res.status(400).send({
        "Bad Request": "RegistersHistory_full by this id not found"
      });
    }
    await registersHistory_full.destroy();
    res.json({
      massage: `RegistersHistory_full with id ${registersHistory_full.id} deleted`
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getRegistersHistory_full,
  getRegistersHistory_full_ById,
  createRegistersHistory_full,
  updateRegistersHistory_full,
  deleteRegistersHistory_full
};
