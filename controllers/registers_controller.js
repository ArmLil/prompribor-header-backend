"use strict";

let db = require("../models");

async function getRegisters(req, res) {
  console.log("function getRegisters");
  try {
    let options = {};
    // if (req.query.commCenter && req.query.commCenter == "include") {
    //   options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    // }

    let registers = await db.Registers.findAndCountAll({
      include: [
        {
          model: db.Registers_Controllers_values,
          as: "values"
        }
      ]
    });
    let count = registers.count;

    res.json({
      registers,
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getRegisterById(req, res) {
  console.log("function getRegisterById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
      // include: [
      //   {
      //     model: db.Registers_Controllers_values,
      //     as: "values"
      //   }
      // ]
    };
    // if (req.query.commCenter && req.query.commCenter == "include") {
    //   options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    // }
    const register = await db.Registers.findOne(options);
    if (register == null) {
      return res
        .status(400)
        .send({ "Bad Request": "Register by this id not found" });
    }
    res.json(register);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function createRegister(req, res) {
  console.log("function createRegister", req.body);
  try {
    let options = {};

    if (req.body.addressRegister) {
      let registerByAddressRegister = await db.Registers.findOne({
        where: { addressRegister: req.body.addressRegister }
      });
      if (registerByAddressRegister) {
        return res.status(400).send({
          "Bad Request": `Register with addressRegister ${req.body.addressRegister} already exists.`
        });
      }
      options.addressRegister = req.body.addressRegister;
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
    if (req.body.description) {
      options.description = req.body.description;
    }

    const register = await db.Registers.findOrCreate({
      where: options
    });

    res.json(register);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
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
        .send({ "Bad Request": "Register by this id not found" });
    }

    if (
      req.body.addressRegister &&
      register.addressRegister != req.body.addressRegister
    ) {
      let registerByAddressRegister = await db.Registers.findOne({
        where: { addressRegister: req.body.addressRegister }
      });
      if (registerByAddressRegister) {
        return res.status(400).send({
          "Bad Request": `Register with addressRegister ${req.body.addressRegister} already exists.`
        });
      }
      register.addressRegister = req.body.addressRegister;
    }

    if (req.body.description) {
      register.description = req.body.description;
    }

    await register.save();
    res.json(register);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteRegister(req, res) {
  console.log("function deleteRegister");
  try {
    const register = await db.Registers.findByPk(req.params.id);
    if (register == null) {
      return res
        .status(400)
        .send({ "Bad Request": "Register by this id not found" });
    }
    await register.destroy();
    res.json({
      massage: `register with id ${register.id} deleted`
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getRegisters,
  getRegisterById,
  createRegister,
  updateRegister,
  deleteRegister
};
