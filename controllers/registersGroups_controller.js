"use strict";

let db = require("../models");

async function getRegistersGroups(req, res) {
  console.log("function getRegistersGroups");
  try {
    let options = {};
    if (req.query.registers && req.query.registers == "include") {
      options.include = [{ model: db.Registers, as: "registers" }];
    }
    let registersGroups = await db.RegistersGroups.findAndCountAll(options);
    let count = registersGroups.count;

    res.json({
      registersGroups,
      count,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function getRegistersGroupById(req, res) {
  console.log("function getRegistersGroupById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    if (req.query.registers && req.query.registers == "include") {
      options.include = [{ model: db.Registers, as: "registers" }];
    }
    const registersGroup = await db.RegistersGroups.findOne(options);
    if (registersGroup == null) {
      return res
        .status(400)
        .send({ message: "RegistersGroup by this id not found" });
    }
    res.json(registersGroup);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createRegistersGroup(req, res) {
  console.log("function createRegistersGroup", req.body);
  try {
    let options = {};

    if (req.body.name) {
      let registersGroupByName = await db.RegistersGroups.findOne({
        where: { name: req.body.name },
      });
      if (registersGroupByName) {
        return res.status(400).send({
          message: `RegistersGroup with name ${req.body.name} already exists.`,
        });
      }
      options.name = req.body.name;
    } else {
      return res.status(400).send({
        message: ` name  required`,
      });
    }

    if (req.body.description) {
      options.description = req.body.description;
    }

    const registersGroup = await db.RegistersGroups.findOrCreate({
      where: options,
    });

    res.json(registersGroup);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function updateRegistersGroup(req, res) {
  console.log("function updateRegistersGroup");
  try {
    const registersGroup = await db.RegistersGroups.findByPk(req.params.id);
    if (registersGroup == null) {
      return res
        .status(400)
        .send({ message: "RegistersGroup by this id not found" });
    }

    if (req.body.name && registersGroup.name != req.body.name) {
      let registersGroupByName = await db.RegistersGroups.findOne({
        where: { name: req.body.name },
      });
      if (registersGroupByName) {
        return res.status(400).send({
          message: `RegistersGroup with name ${req.body.name} already exists.`,
        });
      }
      registersGroup.name = req.body.name;
    }

    if (req.body.description) {
      registersGroup.description = req.body.description;
    }

    await registersGroup.save();
    res.json(registersGroup);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteRegistersGroup(req, res) {
  console.log("function deleteRegistersGroup");
  try {
    const registersGroup = await db.RegistersGroups.findByPk(req.params.id);
    if (registersGroup == null) {
      return res
        .status(400)
        .send({ message: "RegistersGroup by this id not found" });
    }
    await registersGroup.destroy();
    res.json({
      massage: `registersGroup with id ${registersGroup.id} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getRegistersGroups,
  getRegistersGroupById,
  createRegistersGroup,
  updateRegistersGroup,
  deleteRegistersGroup,
};
