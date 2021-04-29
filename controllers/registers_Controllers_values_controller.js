"use strict";

let db = require("../models");

//these are just standard methods, needs to be edited and expanded
async function getRegisters_Controllers_values(req, res) {
  console.log("function getRegisters_Controllers_values");
  try {
    let options = {};
    let registers_Controllers_values = await db.Registers_Controllers_values.findAndCountAll(
      options
    );
    let count = registers_Controllers_values.count;

    res.json({
      registers_Controllers_values,
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getRegisters_Controllers_valuesById(req, res) {
  console.log("function getRegisters_Controllers_valuesById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    const registers_Controllers_values = await db.Registers_Controllers_values.findOne(
      options
    );
    if (registers_Controllers_values == null) {
      return res.status(400).send({
        "Bad Request": "registers_Controllers_values by this id not found"
      });
    }
    res.json(registers_Controllers_values);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function createRegisters_Controllers_values(req, res) {
  console.log("function createRegisters_Controllers_values", req.body);
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

    const _registers_Controllers_values = await db.Registers_Controllers_values.findOne(
      {
        where: {
          controllerId: req.body.controllerId,
          registerId: req.body.registerId
        }
      }
    );
    let registers_Controllers_values = {};
    if (_registers_Controllers_values == null) {
      registers_Controllers_values = await db.Registers_Controllers_values.create(
        options
      );
    } else {
      _registers_Controllers_values.value = req.body.value;
      registers_Controllers_values = _registers_Controllers_values;
      await db.Registers_Controllers_values.update(
        { value: req.body.value },
        {
          where: {
            controllerId: req.body.controllerId,
            registerId: req.body.registerId
          }
        }
      );
    }

    res.json(registers_Controllers_values);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function updateRegisters_Controllers_values(req, res) {
  console.log("function updateRegisters_Controllers_values");
  try {
    const registers_Controllers_values = await db.Registers_Controllers_values.findByPk(
      req.params.id
    );
    if (registers_Controllers_values == null) {
      return res.status(400).send({
        "Bad Request": `Registers_Controllers_values by ${req.params.id} id not found`
      });
    }
    if (req.body.value == undefined) {
      return res.status(400).send({
        "Bad Request": ` value required`
      });
    }
    let _controllerId = registers_Controllers_values.controllerId;
    let _registerId = registers_Controllers_values.registerId;
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

    registers_Controllers_values.controllerId = _controllerId;
    registers_Controllers_values.registerId = _registerId;
    registers_Controllers_values.value = req.body.value;

    await registers_Controllers_values.save();
    res.json(registers_Controllers_values);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteRegisters_Controllers_values(req, res) {
  console.log("function deleteRegisters_Controllers_values");
  try {
    const registers_Controllers_values = await db.Registers_Controllers_values.findByPk(
      req.params.id
    );
    if (registers_Controllers_values == null) {
      return res.status(400).send({
        "Bad Request": "Registers_Controllers_values by this id not found"
      });
    }
    await registers_Controllers_values.destroy();
    res.json({
      massage: `Registers_Controllers_values with id ${registers_Controllers_values.id} deleted`
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getRegisters_Controllers_values,
  getRegisters_Controllers_valuesById,
  createRegisters_Controllers_values,
  updateRegisters_Controllers_values,
  deleteRegisters_Controllers_values
};
