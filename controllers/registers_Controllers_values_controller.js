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
      count,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function getRegisters_Controllers_valuesById(req, res) {
  console.log("function getRegisters_Controllers_valuesById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const registers_Controllers_values = await db.Registers_Controllers_values.findOne(
      options
    );
    if (registers_Controllers_values == null) {
      return res.status(400).send({
        message: "registers_Controllers_values by this id not found",
      });
    }
    res.json(registers_Controllers_values);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function createRegisters_Controllers_values(req, res) {
  console.log("function createRegisters_Controllers_values", req.body);
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
          message: `controller by modbusId ${req.body.controllerModbusId} not found`,
        });
      }

      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          message: `register by address ${req.body.registerAddress} not found`,
        });
      }

      options.controllerModbusId = req.body.controllerModbusId;
      options.registerAddress = req.body.registerAddress;
      options.value = req.body.value;
    } else {
      return res.status(400).send({
        message: ` controllerModbusId, registerAddress, value required in body`,
      });
    }

    const _registers_Controllers_values = await db.Registers_Controllers_values.findOne(
      {
        where: {
          controllerModbusId: req.body.controllerModbusId,
          registerAddress: req.body.registerAddress,
        },
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
            controllerModbusId: req.body.controllerModbusId,
            registerAddress: req.body.registerAddress,
          },
        }
      );
    }

    res.json(registers_Controllers_values);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function updateRegisters_Controllers_values(req, res) {
  console.log("function updateRegisters_Controllers_values");
  try {
    var io = req.app.get("socketio");

    if (req.body.value == undefined) {
      return res.status(400).send({
        message: ` value required`,
      });
    }

    if (req.body.controllerModbusId) {
      const controller = await db.Controllers.findOne({
        where: { modbusId: req.body.controllerModbusId },
      });
      if (controller == null) {
        return res.status(400).send({
          message: `Controller by modbusId ${req.body.controllerModbusId} not found`,
        });
      }
    } else {
      return res.status(400).send({
        message: ` controllerModbusId required`,
      });
    }

    if (req.body.registerAddress) {
      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          message: `RegistersGroup by address ${req.body.registerAddress} not found`,
        });
      }
    } else {
      return res.status(400).send({
        message: ` registerAddress required`,
      });
    }

    const registers_Controllers_values = await db.Registers_Controllers_values.findOne(
      {
        where: {
          controllerModbusId: req.body.controllerModbusId,
          registerAddress: req.body.registerAddress,
        },
      }
    );
    if (registers_Controllers_values == null) {
      return res.status(400).send({
        message: `Registers_Controllers_values not found`,
      });
    }

    registers_Controllers_values.value = req.body.value;

    await registers_Controllers_values.save();

    io.emit("registerControllerValue", registers_Controllers_values);

    res.json(registers_Controllers_values);
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString().toString() });
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
        message: "Registers_Controllers_values by this id not found",
      });
    }
    await registers_Controllers_values.destroy();
    res.json({
      massage: `Registers_Controllers_values with id ${registers_Controllers_values.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString() });
  }
}

module.exports = {
  getRegisters_Controllers_values,
  getRegisters_Controllers_valuesById,
  createRegisters_Controllers_values,
  updateRegisters_Controllers_values,
  deleteRegisters_Controllers_values,
};
