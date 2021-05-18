"use strict";

let db = require("../models");

async function getControllers(req, res) {
  console.log("function getControllers");
  try {
    let options = {};
    if (req.query.commCenter && req.query.commCenter == "include") {
      options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    }
    if (req.query.registersGroups && req.query.registersGroups == "include") {
      if (options.include) {
        options.include.push({
          model: db.RegistersGroups,
          as: "registersGroups",
        });
      } else {
        options.include = [
          { model: db.RegistersGroups, as: "registersGroups" },
        ];
      }
    }
    let controllers = await db.Controllers.findAndCountAll(options);
    let count = controllers.count;

    res.json({
      controllers,
      count,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function getControllerById(req, res) {
  console.log("function getControllerById");
  try {
    let options = {
      where: {
        modbusId: req.params.id,
      },
    };
    if (req.query.commCenter && req.query.commCenter == "include") {
      options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    }
    if (req.query.registersGroups && req.query.registersGroups == "include") {
      if (options.include) {
        options.include.push({
          model: db.RegistersGroups,
          as: "registersGroups",
        });
      } else {
        options.include = [
          { model: db.RegistersGroups, as: "registersGroups" },
        ];
      }
    }
    const controller = await db.Controllers.findOne(options);
    if (controller == null) {
      return res
        .status(400)
        .send({ message: "Controller by this id not found" });
    }
    res.json(controller);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function getRegGroupsRegistersValues(req, res) {
  console.log("function getRegGroupsRegistersValues", req.params);
  try {
    const _controller = await db.Controllers.findOne({
      where: { commCenterPath: req.params.commCenterPath },
    });
    if (_controller == null) {
      return res.status(400).send({
        message: `Controller by commCenterPath ${req.params.commCenterPath} not found`,
      });
    }

    let options = {
      where: {
        commCenterPath: req.params.commCenterPath,
      },
      include: [
        { model: db.CommunicationCenters, as: "commCenter" },
        { model: db.Registers_Controllers_values, as: "values" },
        {
          model: db.RegistersGroups,
          as: "registersGroups",
          include: [
            {
              model: db.Registers,
              as: "registers",
            },
          ],
        },
      ],
    };

    const controller = await db.Controllers.findOne(options);
    if (controller == null) {
      return res
        .status(400)
        .send({ message: "Controller by this param not found" });
    }
    let { values, registersGroups } = controller;

    registersGroups = registersGroups.map((gr, i) => {
      gr.registers.forEach((reg) => {
        values.forEach((val, i) => {
          if (reg.address == val.registerAddress) {
            reg.dataValues.value = val.value;
          }
        });
      });
      return gr;
    });
    controller.registersGroup = registersGroups;
    res.json(controller);
  } catch (err) {
    console.error(err);
    res.json({
      message: err.message,
    });
  }
}

async function createController(req, res) {
  console.log("function createController", req.body);
  try {
    let options = {};
    if (req.body.name) {
      options.name = req.body.name;
    } else {
      return res.status(400).send({ message: "name required" });
    }

    options.modbusId = req.body.modbusId;

    if (req.body.description) {
      options.description = req.body.description;
    }

    if (req.body.commCenterPath) {
      let controller = await db.Controllers.findOne({
        where: { commCenterPath: req.body.commCenterPath },
      });
      if (controller) {
        return res.status(400).send({
          message: `CommCenter with path ${req.body.commCenterPath} connected with another controller.`,
        });
      }
      let commCenterByPath = await db.CommunicationCenters.findOne({
        where: { path: req.body.commCenterPath },
      });
      if (commCenterByPath == null) {
        return res.status(400).send({
          message: `CommCenter with path ${req.body.commCenterPath} not found.`,
        });
      }
      options.commCenterPath = req.body.commCenterPath;
    }

    const controller = await db.Controllers.findOrCreate({
      where: options,
    });

    res.json(controller);
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function updateController(req, res) {
  console.log("function updateController");
  try {
    const controller = await db.Controllers.findByPk(req.params.id);
    if (controller == null) {
      return res
        .status(400)
        .send({ message: "Controller by this id not found" });
    }

    if (req.body.name) {
      controller.name = req.body.name;
    }

    if (req.body.modbusId && controller.modbusId != req.body.modbusId) {
      controller.modbusId = req.body.modbusId;
    }

    if (req.body.description) {
      controller.description = req.body.description;
    }

    if (
      req.body.commCenterPath &&
      controller.commCenterPath != req.body.commCenterPath
    ) {
      let controllerByComCenterId = await db.Controllers.findOne({
        where: { commCenterPath: req.body.commCenterPath },
      });
      if (controllerByComCenterId) {
        return res.status(400).send({
          message: `CommCenter with id ${req.body.commCenterPath} connected with another controller.`,
        });
      }
      let commCenterByComCenterPath = await db.CommunicationCenters.findOne({
        where: { path: req.body.commCenterPath },
      });
      if (commCenterByComCenterId == null) {
        return res.status(400).send({
          message: `CommCenter with id ${req.body.commCenterPath} not found.`,
        });
      }
      controller.commCenterPath = req.body.commCenterPath;
    }

    await controller.save();
    res.json(controller);
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString() });
  }
}

async function deleteController(req, res) {
  console.log("function deleteController");
  try {
    const controller = await db.Controllers.findByPk(req.params.id);
    if (controller == null) {
      return res
        .status(400)
        .send({ message: `Controller by id ${req.params.id} not found` });
    }
    await controller.destroy();
    res.json({ massage: `controller with id ${controller.path} deleted` });
  } catch (err) {
    console.error(err);
    res.json({ message: err.toString() });
  }
}

module.exports = {
  getControllers,
  getControllerById,
  getRegGroupsRegistersValues,
  createController,
  updateController,
  deleteController,
};
