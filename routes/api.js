"use strict";

module.exports = app => {
  const express = require("express");
  const router = require("express").Router();
  const commCenters = require("../controllers/commCenters_controller");
  const controllers = require("../controllers/controllers_controller");
  const registersGroups = require("../controllers/registersGroups_controller");
  const registers = require("../controllers/registers_controller");
  const controller_RegistersGroups = require("../controllers/controller_RegistersGroups_controller");
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
