"use strict";

let db = require("../models");

async function getController_RegistersGroups(req, res) {
  console.log("function getController_RegistersGroups");
  try {
    let options = {};
    let controller_RegistersGroups = await db.Controller_RegistersGroups.findAndCountAll(
      options
    );
    let count = controller_RegistersGroups.count;

    res.json({
      controller_RegistersGroups,
      count,
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function getController_RegistersGroupById(req, res) {
  console.log("function getController_RegistersGroupsById");
  try {
    let options = {
      where: {
        id: req.params.id,
      },
    };
    const controller_RegistersGroup = await db.Controller_RegistersGroups.findOne(
      options
    );
    if (controller_RegistersGroup == null) {
      return res.status(400).send({
        "Bad Request": "controller_RegistersGroup by this id not found",
      });
    }
    res.json(controller_RegistersGroup);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function createController_RegistersGroup(req, res) {
  console.log("function createController_RegistersGroup", req.body);
  try {
    let options = {};

    if (req.body.controllerModbusId && req.body.registersGroupId) {
      const controller = await db.Controllers.findOne({
        where: {
          modbusId: req.body.controllerModbusId,
        },
      });
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `controller by modbusId ${req.body.controllerModbusId} not found`,
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
      options.controllerModbusId = req.body.controllerModbusId;
      options.registersGroupId = req.body.registersGroupId;
    } else {
      return res.status(400).send({
        "Bad Request": ` controllerModbusId and registersGroupId required`,
      });
    }

    const controller_RegistersGroup = await db.Controller_RegistersGroups.findOrCreate(
      {
        where: options,
      }
    );

    res.json(controller_RegistersGroup);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message,
    });
  }
}

async function updateController_RegistersGroup(req, res) {
  console.log("function updateController_RegistersGroups");
  try {
    const controller_RegistersGroup = await db.Controller_RegistersGroups.findByPk(
      req.params.id
    );
    if (controller_RegistersGroup == null) {
      return res.status(400).send({
        "Bad Request": `Controller_RegistersGroup by ${req.params.id} id not found`,
      });
    }
    if (
      req.body.controllerModbusId == undefined &&
      req.body.controllersGroupId == undefined
    ) {
      return res.status(400).send({
        "Bad Request": ` controllerModbusId and registersGroupId required`,
      });
    }
    let _controllerModbusId = controller_RegistersGroup.controllerModbusId;
    let _registersGroupId = controller_RegistersGroup.registersGroupId;
    if (req.body.controllerModbusId) {
      const controller = await db.Controllers.findOne({
        where: {
          modbusId: req.body.controllerModbusId,
        },
      });
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `Controller by modbusId ${req.body.controllerModbusId} not found`,
        });
      }
      _controllerModbusId = req.body.controllerModbusId;
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

    const controller_RegistersGroup_duplicate = await db.Controller_RegistersGroups.findOne(
      {
        where: {
          controllerModbusId: _controllerModbusId,
          registersGroupId: _registersGroupId,
        },
      }
    );
    if (
      controller_RegistersGroup_duplicate &&
      controller_RegistersGroup_duplicate.id !== controller_RegistersGroup.id
    ) {
      return res.status(400).send({
        "Bad Request": `Controller_RegistersGroup already exists`,
      });
    }
    controller_RegistersGroup.controllerModbusId = _controllerModbusId;
    controller_RegistersGroup.registersGroupId = _registersGroupId;

    await controller_RegistersGroup.save();
    res.json(controller_RegistersGroup);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteController_RegistersGroup(req, res) {
  console.log("function deleteController_RegistersGroup");
  try {
    const controller_RegistersGroup = await db.Controller_RegistersGroups.findByPk(
      req.params.id
    );
    if (controller_RegistersGroup == null) {
      return res.status(400).send({
        "Bad Request": "Controller_RegistersGroup by this id not found",
      });
    }
    await controller_RegistersGroup.destroy();
    res.json({
      massage: `Controller_RegistersGroup with id ${controller_RegistersGroup.id} deleted`,
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: error.message });
  }
}

module.exports = {
  getController_RegistersGroups,
  getController_RegistersGroupById,
  createController_RegistersGroup,
  updateController_RegistersGroup,
  deleteController_RegistersGroup,
};
