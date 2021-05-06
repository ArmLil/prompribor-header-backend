"use strict";

let db = require("../models");

async function getRegistersGroups_Registers(req, res) {
  console.log("function getRegistersGroups_Registers");
  try {
    let options = {};
    let registersGroup_Registers = await db.RegistersGroups_Registers.findAndCountAll(
      options
    );
    let count = registersGroup_Registers.count;

    res.json({
      registersGroup_Registers,
      count,
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function getRegistersGroup_RegisterById(req, res) {
  console.log("function getRegistersGroups_RegistersById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    console.log("req.params.id=", req.params.id);
    const registersGroup_Registers = await db.RegistersGroups_Registers.findOne(
      options
    );
    if (registersGroup_Registers == null) {
      return res.status(400).send({
        "Bad Request": "registersGroup_Register by this id not found",
      });
    }
    res.json(registersGroup_Registers);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function createRegistersGroup_Register(req, res) {
  console.log("function createregistersGroup_Register", req.body);
  try {
    let options = {};

    if (req.body.registerAddress && req.body.registersGroupId) {
      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          "Bad Request": `register by address ${req.body.registerAddress} not found`,
        });
      }

      const registersGroup = await db.RegistersGroups.findByPk(
        req.body.registersGroupId
      );
      if (registersGroup == null) {
        return res.status(400).send({
          "Bad Request": `registersGroup by id ${req.body.registersGroupId} not found`,
        });
      }
      options.registerAddress = req.body.registerAddress;
      options.registersGroupId = req.body.registersGroupId;
    } else {
      return res.status(400).send({
        "Bad Request": ` registerAddress and registersGroupId required`,
      });
    }

    const registersGroup_Register = await db.RegistersGroups_Registers.findOrCreate(
      {
        where: options,
      }
    );

    res.json(registersGroup_Register);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function updateRegistersGroup_Register(req, res) {
  console.log("function updateRegistersGroup_Registers");
  try {
    const registersGroup_Register = await db.RegistersGroups_Registers.findByPk(
      req.params.id
    );
    if (registersGroup_Register == null) {
      return res.status(400).send({
        "Bad Request": "RegistersGroup_Register by this id not found",
      });
    }
    if (
      req.body.registerAddress == undefined &&
      req.body.registersGroupId == undefined
    ) {
      return res.status(400).send({
        "Bad Request": ` registerAddress AND registersGroupId required`,
      });
    }
    let _registerAddress = registersGroup_Register.registerAddress;
    let _registersGroupId = registersGroup_Register.registersGroupId;
    if (req.body.registerAddress) {
      const register = await db.Registers.findOne({
        where: { address: req.body.registerAddress },
      });
      if (register == null) {
        return res.status(400).send({
          "Bad Request": `Register by id ${req.body.registerAddress} not found`,
        });
      }
      _registerAddress = req.body.registerAddress;
    }
    if (req.body.registersGroupId) {
      const registersGroup = await db.RegistersGroups.findByPk(
        req.body.registersGroupId
      );
      if (registersGroup == null) {
        return res.status(400).send({
          "Bad Request": `RegistersGroup by id ${req.body.registersGroupId} not found`,
        });
      }
      _registersGroupId = req.body.registersGroupId;
    }

    const registersGroup_Register_duplicate = await db.RegistersGroups_Registers.findOne(
      {
        where: {
          registerAddress: _registerAddress,
          registersGroupId: _registersGroupId,
        },
      }
    );
    if (
      registersGroup_Register_duplicate &&
      registersGroup_Register_duplicate.id !== registersGroup_Register.id
    ) {
      return res.status(400).send({
        "Bad Request": `RegistersGroups_Registers already exists`,
      });
    }
    registersGroup_Register.registerAddress = _registerAddress;
    registersGroup_Register.registersGroupId = _registersGroupId;

    await registersGroup_Register.save();
    res.json(registersGroup_Register);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteRegistersGroup_Register(req, res) {
  console.log("function deleteRegistersGroups_Register");
  try {
    const registersGroup_Register = await db.RegistersGroups_Registers.findByPk(
      req.params.id
    );
    if (registersGroup_Register == null) {
      return res.status(400).send({
        "Bad Request": "RegistersGroups_Registers by this id not found",
      });
    }
    await registersGroup_Register.destroy();
    res.json({
      massage: `RegistersGroups_Registers with id ${registersGroup_Register.id} deleted`,
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getRegistersGroups_Registers,
  getRegistersGroup_RegisterById,
  createRegistersGroup_Register,
  updateRegistersGroup_Register,
  deleteRegistersGroup_Register,
};
