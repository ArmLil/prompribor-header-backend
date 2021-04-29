"use strict";

module.exports = app => {
  const express = require("express");
  const router = require("express").Router();
  const commCenters = require("../controllers/commCenters_controller");
  const controllers = require("../controllers/controllers_controller");
  const registersGroups = require("../controllers/registersGroups_controller");
  const registers = require("../controllers/registers_controller");
  const controller_RegistersGroups = require("../controllers/controller_RegistersGroups_controller");
  const registersGroups_Registers = require("../controllers/registersGroups_Registers_controller");
  const registersHistory = require("../controllers/registersHistory_controller");
  const registersHistory_full = require("../controllers/registersHistory_full_controller");
  const users = require("../controllers/user_controller");
  const auth = require("../controllers/auth_controller");

  router.get("/", function(req, res) {
    res.json({
      message: "RESTapi service"
    });
  });

  // if query ?controller=include then will get with controller
  router.get("/commCenters", commCenters.getCommCenters);
  router.get("/commCenters/:id", commCenters.getCommCenterById);
  router.post("/commCenters", commCenters.createCommCenter);
  router.put("/commCenters/:id", commCenters.updateCommCenter);
  router.delete("/commCenters/:id", commCenters.deleteCommCenter);

  // if query ?commCenter=include then will get with commCenter
  // if query ?registersGroups=include then will get with registersGroups
  router.get("/controllers", controllers.getControllers);
  router.get("/controllers/:id", controllers.getControllerById);
  router.post("/controllers", controllers.createController);
  router.put("/controllers/:id", controllers.updateController);
  router.delete("/controllers/:id", controllers.deleteController);

  // if query ?registers=include then will get with registers
  router.get("/registersGroups", registersGroups.getRegistersGroups);
  router.get("/registersGroups/:id", registersGroups.getRegistersGroupById);
  router.post("/registersGroups", registersGroups.createRegistersGroup);
  router.put("/registersGroups/:id", registersGroups.updateRegistersGroup);
  router.delete("/registersGroups/:id", registersGroups.deleteRegistersGroup);

  router.get("/registers", registers.getRegisters);
  router.get("/registers/:id", registers.getRegisterById);
  router.post("/registers", registers.createRegister);
  router.put("/registers/:id", registers.updateRegister);
  router.delete("/registers/:id", registers.deleteRegister);

  router.get(
    "/controller_RegistersGroups",
    controller_RegistersGroups.getController_RegistersGroups
  );
  router.get(
    "/controller_RegistersGroups/:id",
    controller_RegistersGroups.getController_RegistersGroupById
  );
  router.post(
    "/controller_RegistersGroups",
    controller_RegistersGroups.createController_RegistersGroup
  );
  router.put(
    "/controller_RegistersGroups/:id",
    controller_RegistersGroups.updateController_RegistersGroup
  );
  router.delete(
    "/controller_RegistersGroups/:id",
    controller_RegistersGroups.deleteController_RegistersGroup
  );

  router.get(
    "/registersGroups_Registers",
    registersGroups_Registers.getRegistersGroups_Registers
  );
  router.get(
    "/registersGroups_Registers/:id",
    registersGroups_Registers.getRegistersGroup_RegisterById
  );
  router.post(
    "/registersGroups_Registers",
    registersGroups_Registers.createRegistersGroup_Register
  );
  router.put(
    "/registersGroups_Registers/:id",
    registersGroups_Registers.updateRegistersGroup_Register
  );
  router.delete(
    "/registersGroups_Registers/:id",
    registersGroups_Registers.deleteRegistersGroup_Register
  );

  router.get("/registersHistory", registersHistory.getRegistersHistory);
  router.get("/registersHistory/:id", registersHistory.getRegistersHistoryById);
  router.post("/registersHistory", registersHistory.createRegistersHistory);
  router.put("/registersHistory/:id", registersHistory.updateRegistersHistory);
  router.delete(
    "/registersHistory/:id",
    registersHistory.deleteRegistersHistory
  );

  router.get(
    "/registersHistory_full",
    registersHistory_full.getRegistersHistory_full
  );
  router.get(
    "/registersHistory_full/:id",
    registersHistory_full.getRegistersHistory_full_ById
  );
  router.post(
    "/registersHistory_full",
    registersHistory_full.createRegistersHistory_full
  );
  router.put(
    "/registersHistory_full/:id",
    registersHistory_full.updateRegistersHistory_full
  );
  router.delete(
    "/registersHistory_full/:id",
    registersHistory_full.deleteRegistersHistory_full
  );

  router.get("/users", auth.checkauth, users.getUsers);
  router.get("/userById/:id", auth.checkauth, users.getUserById);
  // router.post("/users", auth.checkauth, users.createUser);
  // router.put("/users/:id", auth.checkauth, users.updateUser);
  // router.delete("/users/:id", auth.checkauth, users.deleteUser);

  // router.post("/register", auth.register);
  // router.post("/login", auth.login);
  // router.get("/confirmation/:token", auth.emailConfirmation, auth.showHome);

  return router;
};
