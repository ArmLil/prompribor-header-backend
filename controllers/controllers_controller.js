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
          as: "registersGroups"
        });
      } else {
        options.include = [
          { model: db.RegistersGroups, as: "registersGroups" }
        ];
      }
    }
    let controllers = await db.Controllers.findAndCountAll(options);
    let count = controllers.count;

    res.json({
      controllers,
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getControllerById(req, res) {
  console.log("function getControllerById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    if (req.query.commCenter && req.query.commCenter == "include") {
      options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    }
    if (req.query.registersGroups && req.query.registersGroups == "include") {
      if (options.include) {
        options.include.push({
          model: db.RegistersGroups,
          as: "registersGroups"
        });
      } else {
        options.include = [
          { model: db.RegistersGroups, as: "registersGroups" }
        ];
      }
    }
    const controller = await db.Controllers.findOne(options);
    if (controller == null) {
      return res
        .status(400)
        .send({ "Bad Request": "Controller by this id not found" });
    }
    res.json(controller);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getRegGroupsRegisters(req, res) {
  console.log("function getRegGroupsRegisters");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    if (req.query.commCenter && req.query.commCenter == "include") {
      options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    }
    let addOption = {
      model: db.RegistersGroups,
      as: "registersGroups",
      include: [
        {
          model: db.Registers,
          as: "registers",
          include: [
            {
              where: { controllerId: req.params.id },
              model: db.Registers_Controllers_values,
              as: "values"
            }
          ]
        }
      ]
    };
    if (options.include) {
      options.include.push(addOption);
    } else {
      options.include = [addOption];
    }

    const controller = await db.Controllers.findOne(options);
    if (controller == null) {
      return res
        .status(400)
        .send({ "Bad Request": "Controller by this id not found" });
    }
    res.json(controller);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
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
      return res.status(400).send({ "Bad Request": "name required" });
    }

    if (req.body.modbusId) {
      let controllerByModbusId = await db.Controllers.findOne({
        where: { modbusId: req.body.modbusId }
      });
      if (controllerByModbusId) {
        return res.status(400).send({
          "Bad Request": `Controller with modbusId ${req.body.modbusId} already exists.`
        });
      }
      options.modbusId = req.body.modbusId;
    }

    if (req.body.description) {
      options.description = req.body.description;
    }

    if (req.body.communicationCenterId) {
      let controller = await db.Controllers.findOne({
        where: { communicationCenterId: req.body.communicationCenterId }
      });
      if (controller) {
        return res.status(400).send({
          "Bad Request": `CommCenter with id ${req.body.communicationCenterId} connected with another controller.`
        });
      }
      let commCenterByComCenterId = await db.CommunicationCenters.findOne({
        where: { id: req.body.communicationCenterId }
      });
      if (commCenterByComCenterId == null) {
        return res.status(400).send({
          "Bad Request": `CommCenter with id ${req.body.communicationCenterId} not found.`
        });
      }
      options.communicationCenterId = req.body.communicationCenterId;
    }

    const controller = await db.Controllers.findOrCreate({
      where: options
    });

    res.json(controller);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
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
        .send({ "Bad Request": "Controller by this id not found" });
    }

    if (req.body.name) {
      controller.name = req.body.name;
    }

    if (req.body.modbusId && controller.modbusId != req.body.modbusId) {
      let controllerByModbusId = await db.Controllers.findOne({
        where: { modbusId: req.body.modbusId }
      });
      if (controllerByModbusId) {
        return res.status(400).send({
          "Bad Request": `Controller with modbusId ${req.body.modbusId} already exists.`
        });
      }
      controller.modbusId = req.body.modbusId;
    }

    if (req.body.description) {
      controller.description = req.body.description;
    }

    if (
      req.body.communicationCenterId &&
      controller.communicationCenterId != req.body.communicationCenterId
    ) {
      let controllerByComCenterId = await db.Controllers.findOne({
        where: { communicationCenterId: req.body.communicationCenterId }
      });
      if (controllerByComCenterId) {
        return res.status(400).send({
          "Bad Request": `CommCenter with id ${req.body.communicationCenterId} connected with another controller.`
        });
      }
      let commCenterByComCenterId = await db.CommunicationCenters.findOne({
        where: { id: req.body.communicationCenterId }
      });
      if (commCenterByComCenterId == null) {
        return res.status(400).send({
          "Bad Request": `CommCenter with id ${req.body.communicationCenterId} not found.`
        });
      }
      controller.communicationCenterId = req.body.communicationCenterId;
    }

    await controller.save();
    res.json(controller);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteController(req, res) {
  console.log("function deleteController");
  try {
    const controller = await db.Controllers.findByPk(req.params.id);
    if (controller == null) {
      return res
        .status(400)
        .send({ "Bad Request": "Controller by this id not found" });
    }
    await controller.destroy();
    res.json({ massage: `controller with id ${controller.id} deleted` });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getControllers,
  getControllerById,
  getRegGroupsRegisters,
  createController,
  updateController,
  deleteController
};
