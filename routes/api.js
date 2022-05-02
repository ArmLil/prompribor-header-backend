"use strict";

module.exports = (app) => {
  const express = require("express");
  const router = require("express").Router();
  const commCenters = require("../controllers/commCenters_controller");
  const mapPolylinePoints = require("../controllers/mapPolylinePoints_controller");
  const controllers = require("../controllers/controllers_controller");
  const registers = require("../controllers/registers_controller");
  const registers_Controllers_values = require("../controllers/registers_Controllers_values_controller");
  const avarii_journal = require("../controllers/avarii_journal_controller");
  const donesenii_journal = require("../controllers/donesenii_journal_controller");
  const nasosi_journal = require("../controllers/nasosi_journal_controller");
  const fuel_journal = require("../controllers/fuel_journal_controller");
  const users = require("../controllers/user_controller");
  const auth = require("../controllers/auth_controller");

  router.get("/", function (req, res) {
    res.json({
      message: "RESTapi service",
    });
  });

  router.get("/mapCommCenters", commCenters.getMapCommCenters);
  router.get("/commCenters/:id", commCenters.getCommCenterById);
  router.get(
    "/commCenters/commCenterByPath/:path",
    commCenters.getCommCenterByPath
  );
  router.get(
    "/commCenterControllersRegs/:id",
    commCenters.getCommCenterControllersRegs
  );
  router.post("/commCenters", auth.checkauth, commCenters.createCommCenter);
  router.put("/commCenters/:id", auth.checkauth, commCenters.updateCommCenter);
  router.delete(
    "/commCenters/:id",
    auth.checkauth,
    commCenters.deleteCommCenterByPath
  );

  router.post(
    "/mapPolylinePoints",
    auth.checkauth,
    mapPolylinePoints.createMapPolylinePoint
  );
  router.put(
    "/mapPolylinePoints/:id",
    auth.checkauth,
    mapPolylinePoints.updateMapPolylinePoint
  );
  router.delete(
    "/mapPolylinePoints/:id",
    auth.checkauth,
    mapPolylinePoints.deleteMapPolylinePoint
  );

  router.get("/controllers", controllers.getControllers);
  router.get("/controllers/:id", controllers.getControllerById);
  router.post("/controllers", controllers.createController);
  router.put("/controllers/:id", controllers.updateController);
  router.delete("/controllers/:id", controllers.deleteController);

  router.get("/registers", registers.getRegisters);
  router.get("/registers/:id", registers.getRegisterById);
  router.post("/registers", registers.createRegister);
  router.put("/registers/:id", registers.updateRegister);
  router.delete("/registers/:id", registers.deleteRegister);

  // registers_Controllers_values
  router.get(
    "/registers_Controllers_values",
    registers_Controllers_values.getRegisters_Controllers_values
  );
  router.get(
    "/registers_Controllers_values/:id",
    registers_Controllers_values.getRegisters_Controllers_valuesById
  );
  router.post(
    "/registers_Controllers_values",
    registers_Controllers_values.createRegisters_Controllers_values
  );
  router.put(
    "/registers_Controllers_values",
    registers_Controllers_values.updateRegisters_Controllers_values
  );
  router.delete(
    "/registers_Controllers_values/:id",
    registers_Controllers_values.deleteRegisters_Controllers_values
  );

  // avarii
  router.get("/avarii", avarii_journal.getAvarii_JournalData);
  router.get("/avarii/:id", avarii_journal.getAvarii_JournalDataById);
  router.post(
    "/avarii",
    auth.checkauth,
    avarii_journal.createAvarii_JournalData
  );
  router.put(
    "/avarii/:id",
    auth.checkauth,
    avarii_journal.updateAvarii_Journal
  );
  router.delete(
    "/avarii/:id",
    auth.checkauth,
    avarii_journal.deleteAvarii_Journal
  );

  // donesenii
  router.get("/donesenii", donesenii_journal.getDonesenii_JournalData);
  router.get("/donesenii/:id", donesenii_journal.getDonesenii_JournalDataById);
  router.post(
    "/donesenii",
    auth.checkauth,
    donesenii_journal.createDonesenii_JournalData
  );
  router.put(
    "/donesenii/:id",
    auth.checkauth,
    donesenii_journal.updateDonesenii_Journal
  );
  router.delete(
    "/donesenii/:id",
    auth.checkauth,
    donesenii_journal.deleteDonesenii_Journal
  );

  // nasosi
  router.get("/nasosi", nasosi_journal.getNasosi_JournalData);
  router.get("/nasosi/:id", nasosi_journal.getNasosi_JournalDataById);
  router.post(
    "/nasosi",
    auth.checkauth,
    nasosi_journal.createNasosi_JournalData
  );
  router.put(
    "/nasosi/:id",
    auth.checkauth,
    nasosi_journal.updateNasosi_Journal
  );
  router.delete(
    "/nasosi/:id",
    auth.checkauth,
    nasosi_journal.deleteNasosi_Journal
  );

  // fuel
  router.get("/fuel", fuel_journal.getFuel_JournalData);
  router.get("/fuel/:id", fuel_journal.getFuel_JournalDataById);
  router.post("/fuel", auth.checkauth, fuel_journal.createFuel_JournalData);
  router.put("/fuel/:id", auth.checkauth, fuel_journal.updateFuel_Journal);
  router.delete("/fuel/:id", auth.checkauth, fuel_journal.deleteFuel_Journal);

  // users
  router.get("/users", auth.checkauth, users.getUsers);
  router.get("/userById/:id", auth.checkauth, users.getUsersById);
  router.get("/userBytoken/:token", users.getUserByToken);
  router.post("/users", auth.checkauth, users.createUser);
  router.put("/users/:id", auth.checkauth, users.updateUser);
  router.delete("/users/:id", auth.checkauth, users.deleteUser);

  router.post("/signup", auth.signup);
  router.post("/login", auth.login);
  router.get("/checkauth", auth.checkauth);
  // router.get("/confirmation/:token", auth.emailConfirmation, auth.showHome);

  return router;
};
