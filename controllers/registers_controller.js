"use strict";

let db = require("../models");

async function getRegisters(req, res) {
  console.log("function getRegisters");
  try {
    let registers = await db.Registers.findAndCountAll();
    let count = registers.count;

    res.json({
      registers,
      count,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: err.toString(),
    });
  }
}

async function getRegisterById(req, res) {
  console.log("function getRegisterById");
  try {
    let options = {
      where: {
        address: req.params.id,
      },
    };
    const register = await db.Registers.findOne(options);
    if (register == null) {
      return res
        .status(400)
        .send({ message: `Register by address ${req.params.id} not found` });
    }
    res.json(register);
  } catch (err) {
    console.error(err);
    res.json({
      message: err.toString(),
    });
  }
}

async function createRegister(req, res) {
  console.log("function createRegister", req.body);
  try {
    let options = {};

    options.address = req.body.address;

    if (req.body.sizeRegister) {
      options.sizeRegister = req.body.sizeRegister;
    }
    if (req.body.recordable) {
      options.recordable = req.body.recordable;
    }
    if (req.body.dataType) {
      options.dataType = req.body.dataType;
    }
    if (req.body.appointment) {
      options.appointment = req.body.appointment;
    }
    if (req.body.description) {
      options.description = req.body.description;
    }

    const register = await db.Registers.findOrCreate({
      where: options,
    });

    res.json(register);
  } catch (err) {
    console.error(err);
    res.json({
      message: err.toString(),
    });
  }
}

async function updateRegister(req, res) {
  console.log("function updateRegister");
  try {
    const register = await db.Registers.findByPk(req.params.id);
    if (register == null) {
      return res
        .status(400)
        .send({ message: `Register by id ${req.params.id} not found` });
    }
    if (req.body.sizeRegister) {
      options.sizeRegister = req.body.sizeRegister;
    }
    if (req.body.recordable) {
      options.recordable = req.body.recordable;
    }
    if (req.body.dataType) {
      options.dataType = req.body.dataType;
    }
    if (req.body.appointment) {
      options.appointment = req.body.appointment;
    }
    if (req.body.address) {
      register.address = req.body.address;
    }
    if (req.body.description) {
      register.description = req.body.description;
    }

    await register.save();
    res.json(register);
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString() });
  }
}

async function deleteRegister(req, res) {
  console.log("function deleteRegister");
  try {
    const register = await db.Registers.findByPk(req.params.id);
    if (register == null) {
      return res
        .status(400)
        .send({ message: `Register by address ${req.params.id} not found` });
    }
    await register.destroy();
    res.json({
      massage: `register with id ${register.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString() });
  }
}

module.exports = {
  getRegisters,
  getRegisterById,
  createRegister,
  updateRegister,
  deleteRegister,
};
