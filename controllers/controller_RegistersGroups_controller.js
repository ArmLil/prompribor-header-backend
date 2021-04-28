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
      count
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function getController_RegistersGroupById(req, res) {
  console.log("function getController_RegistersGroupsById");
  try {
    let options = {
      where: {
        id: req.params.id
      }
    };
    const controller_RegistersGroups = await db.Controller_RegistersGroups.findOne(
      options
    );
    if (controller_RegistersGroups == null) {
      return res.status(400).send({
        "Bad Request": "controller_RegistersGroups by this id not found"
      });
    }
    res.json(controller_RegistersGroups);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
    });
  }
}

async function createController_RegistersGroup(req, res) {
  console.log("function createcontroller_RegistersGroups", req.body);
  try {
    let options = {};

    if (req.body.controllerId && req.body.registersGroupId) {
      const controller = await db.Controllers.findByPk(req.body.controllerId);
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `controller by id ${req.body.controllerId} not found`
        });
      }

      const registersGroup = await db.RegistersGroups.findByPk(
        req.body.registersGroupId
      );
      if (registersGroup == null) {
        return res.status(400).send({
          "Bad Request": `registersGroup by id ${req.body.registersGroupId} not found`
        });
      }
      options.controllerId = req.body.controllerId;
      options.registersGroupId = req.body.registersGroupId;
    } else {
      return res.status(400).send({
        "Bad Request": ` controllerId and registersGroupId required`
      });
    }

    const controller_RegistersGroup = await db.Controller_RegistersGroups.findOrCreate(
      {
        where: options
      }
    );

    res.json(controller_RegistersGroup);
  } catch (error) {
    console.error(error);
    res.json({
      errorMessage: error.message
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
        "Bad Request": "Controller_RegistersGroup by this id not found"
      });
    }

    if (req.body.controllerId && req.body.registersGroupId) {
      const controller = await db.Controllers.findByPk(req.body.controllerId);
      if (controller == null) {
        return res.status(400).send({
          "Bad Request": `Controller by id ${req.body.controllerId} not found`
        });
      }

      const registersGroup = await db.RegistersGroups.findByPk(
        req.body.registersGroupId
      );
      if (registersGroup == null) {
        return res.status(400).send({
          "Bad Request": `RegistersGroup by id ${req.body.registersGroupId} not found`
        });
      }
      const controller_RegistersGroup_duplicate = await db.Controller_RegistersGroups.findOne(
        {
          where: {
            controllerId: req.body.controllerId,
            registersGroupId: req.body.registersGroupId
          }
        }
      );
      if (controller_RegistersGroup_duplicate) {
        return res.status(400).send({
          "Bad Request": `RegistersGroup already exists`
        });
      }
      controller_RegistersGroup.controllerId = req.body.controllerId;
      controller_RegistersGroup.registersGroupId = req.body.registersGroupId;
    } else {
      return res.status(400).send({
        "Bad Request": ` controllerId and registersGroupId required`
      });
    }

    await controller_RegistersGroup.save();
    res.json(controller_RegistersGroup);
  } catch (err) {
    console.error(err);
    res.json({ errorMessage: err.message });
  }
}

async function deleteController_RegistersGroup(req, res) {
  console.log("function deleteController_RegistersGroups");
  try {
    const controller_RegistersGroups = await db.Controller_RegistersGroups.findByPk(
      req.params.id
    );
    if (controller_RegistersGroups == null) {
      return res.status(400).send({
        "Bad Request": "Controller_RegistersGroups by this id not found"
      });
    }
    await controller_RegistersGroups.destroy();
    res.json({
      massage: `Controller_RegistersGroups with id ${controller_RegistersGroups.id} deleted`
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
  deleteController_RegistersGroup
};
