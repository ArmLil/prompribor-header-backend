"use strict";

module.exports = app => {
  const express = require("express");
  const router = require("express").Router();
  const commCenters = require("../controllers/commCenters_controller");
  const controllers = require("../controllers/controllers_controller");

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

  // if query ?commCenter=true then will get with commCenter
  router.get("/controllers", controllers.getControllers);
  router.get("/controllers/:id", controllers.getControllerById);
  router.post("/controllers", controllers.createController);
  router.put("/controllers/:id", controllers.updateController);
  router.delete("/controllers/:id", controllers.deleteController);

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
