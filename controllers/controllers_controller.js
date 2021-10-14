"use strict";

let db = require("../models");

async function getControllers(req, res) {
  console.log("function getControllers");
  try {
    let options = {};
    if (req.query.commCenter && req.query.commCenter == "include") {
      options.include = [{ model: db.CommunicationCenters, as: "commCenter" }];
    }

    let controllers = await db.Controllers.findAndCountAll(options);
    let count = controllers.count;

    res.json({
      controllers,
      count,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
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
    const controller = await db.Controllers.findOne(options);
    if (controller == null) {
      return res
        .status(400)
        .send({ message: "Controller by this id not found" });
    }
    res.json(controller);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
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
    if (req.body.status) {
      options.status = req.body.status;
    }
    if (req.body.programmStatus) {
      options.programmStatus = req.body.programmStatus;
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
    res.status(502).json({
      message: err.toString(),
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
    if (req.body.status) {
      controller.status = req.body.status;
    }
    if (req.body.programmStatus) {
      controller.programmStatus = req.body.programmStatus;
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
    res.status(502).json({ message: err.toString() });
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
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getControllers,
  getControllerById,
  createController,
  updateController,
  deleteController,
};
