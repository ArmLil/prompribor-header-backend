"use strict";
const uuidv4 = require("uuid/v4");
let db = require("../models");
const line = require("../config/config.js")["line"];
const validateLatLon = require("./helpers/validateLatLon");
const isNumeric = require("./helpers/isNumeric");

async function getMapCommCenters(req, res) {
  console.log("function getMapCommCenters");
  try {
    let options = {};

    options.include = [
      {
        model: db.Controllers,
        as: "controllers",
        include: [
          {
            model: db.Registers,
            as: "registers",
          },
        ],
      },
    ];

    let commCenters = await db.CommunicationCenters.findAndCountAll(options);

    let count = commCenters.count;

    let mapPolylinePoints = await db.MapPolylinePoints.findAndCountAll({
      order: [["index", "ASC"]],
    });
    let bridgePolylinePoints = await db.BridgePolylinePoints.findAndCountAll();
    function groupBy(collection, property) {
      var i = 0,
        val,
        index,
        values = [],
        result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1) result[index].push(collection[i]);
        else {
          values.push(val);
          result.push([collection[i]]);
        }
      }
      return result;
    }

    let groupType = groupBy(bridgePolylinePoints.rows, "type");
    commCenters.mapPolylinePoints = mapPolylinePoints;
    res.json({
      commCenters,
      count,
      bridge: groupType,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function getCommCenterById(req, res) {
  console.log("function getCommCenterById");
  try {
    let options = {
      where: {
        path: req.params.id,
      },
      include: [
        {
          model: db.Controllers,
          as: "controllers",
        },
      ],
    };

    let fuel_journal_data = await db.Fuel_Journals.findAndCountAll({
      where: { commCenterId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let avarii_journal_data = await db.Avarii_Journals.findAndCountAll({
      where: { commCenterId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let donesenii_journal_data = await db.Donesenii_Journals.findAndCountAll({
      where: { commCenterId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let nasosi_journal_data = await db.Nasosi_Journals.findAndCountAll({
      where: { commCenterId: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let commCenter = await db.CommunicationCenters.findOne(options);
    if (commCenter == null) {
      return res
        .status(400)
        .send({ message: "CommunicationCenter with this id not found" });
    }
    let _commCenter = Object.assign(
      {},
      commCenter.dataValues,
      {
        nasosi_journal_data: nasosi_journal_data.rows,
      },
      {
        donesenii_journal_data: donesenii_journal_data.rows,
      },
      {
        avarii_journal_data: avarii_journal_data.rows,
      },
      {
        fuel_journal_data: fuel_journal_data.rows,
      }
    );

    res.json(_commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function getCommCenterByPath(req, res) {
  console.log("function getCommCenterByPath");
  let offset = isNumeric(req.query.offset) ? req.query.offset : 0;
  let limit = isNumeric(req.query.limit) ? req.query.limit : null;
  try {
    let options = {
      where: {
        path: req.params.path,
      },
    };
    let commCenter = await db.CommunicationCenters.findOne(options);
    if (commCenter == null) {
      return res
        .status(400)
        .send({ message: "CommunicationCenter with this path not found" });
    }
    let _commCenter = Object.assign({}, commCenter.dataValues);
    if (req.query.fuel) {
      let fuel_journal_data = await db.Fuel_Journals.findAndCountAll({
        where: { commCenterId: commCenter.id },
        order: [["createdAt", "ASC"]],
        offset,
        limit,
      });
      fuel_journal_data.offset = offset;
      fuel_journal_data.limit = limit;
      _commCenter.fuel = fuel_journal_data;
    } else if (req.query.avarii) {
      let avarii_journal_data = await db.Avarii_Journals.findAndCountAll({
        where: { commCenterId: commCenter.id },
        order: [["createdAt", "ASC"]],
        offset: offset,
        limit: limit,
      });
      avarii_journal_data.offset = offset;
      avarii_journal_data.limit = limit;
      _commCenter.avarii = avarii_journal_data;
    } else if (req.query.donesenii) {
      let donesenii_journal_data = await db.Donesenii_Journals.findAndCountAll({
        where: { commCenterId: commCenter.id },
        order: [["createdAt", "ASC"]],
        offset: offset,
        limit: limit,
      });
      donesenii_journal_data.offset = offset;
      donesenii_journal_data.limit = limit;
      _commCenter.donesenii = donesenii_journal_data;
    } else if (req.query.nasosi) {
      let nasosi_journal_data = await db.Nasosi_Journals.findAndCountAll({
        where: { commCenterId: commCenter.id },
        order: [["createdAt", "ASC"]],
        offset: offset,
        limit: limit,
      });
      nasosi_journal_data.offset = offset;
      nasosi_journal_data.limit = limit;
      _commCenter.nasosi = nasosi_journal_data;
    }

    res.json(_commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function getCommCenterControllersRegs(req, res) {
  console.log("function getCommCenterControllersRegs");
  try {
    let options = {
      where: {
        path: req.params.id,
      },
      include: [
        {
          model: db.Controllers,
          as: "controllers",
          include: [
            {
              model: db.Registers,
              as: "registers",
            },
          ],
        },
      ],
    };

    let commCenter = await db.CommunicationCenters.findOne(options);
    if (commCenter == null) {
      return res
        .status(400)
        .send({ message: "CommunicationCenter with this id not found" });
    }
    res.json(commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createCommCenter(req, res) {
  console.log("function createCommCenter");
  try {
    let options = {};

    if (req.body.path) {
      const commCenterByPath = await db.CommunicationCenters.findOne({
        where: { path: req.body.path },
      });
      if (commCenterByPath) {
        return res.status(422).send({
          pathError: "Станция с таким идентификатором уже существует",
        });
      }
      options.path = req.body.path;
    } else {
      return res.status(400).send({ message: "path required" });
    }

    if (req.body.name) {
      const commCenterByName = await db.CommunicationCenters.findOne({
        where: { name: req.body.name },
      });
      if (commCenterByName) {
        return res
          .status(422)
          .send({ nameError: "Станция с таким именем уже существует" });
      }
      options.name = req.body.name;
    } else {
      return res.status(400).send({ message: "name required" });
    }

    if (req.body.index) {
      if (
        !Number(req.body.index) ||
        String(req.body.index).slice(-2) !== "00" ||
        Number(req.body.index) < 0
      ) {
        return res.status(422).send({
          indexError:
            "Поле должно содержать только натуральное число, которое заканчивается на 00",
        });
      }
      options.index = req.body.index;
      const commCenterByIndex = await db.CommunicationCenters.findOne({
        where: { index: req.body.index },
      });
      if (commCenterByIndex) {
        return res
          .status(422)
          .send({ indexError: "Станция с таким индексом уже существует" });
      }
    } else {
      return res.status(400).send({ message: "index required" });
    }

    if (req.body.lat) {
      if (!validateLatLon(req.body.lat)) {
        return res
          .status(400)
          .send({ latError: "wrong lat format " + req.body.lat });
      }
      options.lat = req.body.lat;
    } else {
      return res.status(400).send({ message: "lat required" });
    }
    if (req.body.lon) {
      if (!validateLatLon(req.body.lon)) {
        return res
          .status(400)
          .send({ lonError: "wrong lon format " + req.body.lon });
      }
      options.lon = req.body.lon;
    } else {
      return res.status(400).send({ message: "lon required" });
    }
    if (req.body.tablePosition) {
      options.tablePosition = req.body.tablePosition;
    } else {
      return res.status(400).send({ message: "tablePosition required" });
    }

    if (req.body.description) {
      options.description = req.body.description;
    }

    /////create new CommunicationCenter
    const commCenter = await db.CommunicationCenters.findOrCreate({
      where: options,
    });

    // create controllers for created commCenter
    const conts = await db.Controllers.findAll({}).map((el) =>
      el.get({ plain: true })
    );

    //целая часть максимльного modbusID
    let maxModbusIdTrunc = 0;
    conts.forEach((cont, i) => {
      if (Math.trunc(Number(cont.modbusId)) > maxModbusIdTrunc) {
        maxModbusIdTrunc = Math.trunc(Number(cont.modbusId));
      }
    });
    const newModbusId = maxModbusIdTrunc + 1;
    const newNasosiController = await db.Controllers.findOrCreate({
      where: {
        modbusId: newModbusId + ".1",
        name: `${req.body.name}-${newModbusId} контролер-${newModbusId}.1`,
        line: line,
        type: "nasosi",
        commCenterPath: req.body.path,
        description: "Состояние насоса",
      },
    });
    const newFuelController = await db.Controllers.findOrCreate({
      where: {
        modbusId: newModbusId + ".2",
        name: `${req.body.name}-${newModbusId} контролер-${newModbusId}.2`,
        line: line,
        type: "fuel",
        commCenterPath: req.body.path,
        description: "Состояние горючего",
      },
    });

    // create registers for created controllers
    await db.Registers_Controllers_values.bulkCreate([
      //состояние насоса
      {
        id: uuidv4(),
        registerAddress: "0x1600",
        controllerModbusId: `${newModbusId}.1`,
        value: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1602",
        controllerModbusId: `${newModbusId}.1`,
        value: "0.003",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1604",
        controllerModbusId: `${newModbusId}.1`,
        value: "0.002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Учет нефтепродукта
      {
        id: uuidv4(),
        registerAddress: "0x1312",
        controllerModbusId: `${newModbusId}.2`,
        value: "22.270",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1316",
        controllerModbusId: `${newModbusId}.2`,
        value: "1.220",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1374",
        controllerModbusId: `${newModbusId}.2`,
        value: "0.001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x13fb",
        controllerModbusId: `${newModbusId}.2`,
        value: "0.000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x136c",
        controllerModbusId: `${newModbusId}.2`,
        value: "133.530",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        registerAddress: "0x1358",
        controllerModbusId: `${newModbusId}.2`,
        value: "112.001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // create new point for display line on map
    await db.MapPolylinePoints.findOrCreate({
      where: {
        id: uuidv4(),
        index: req.body.index,
        lat: req.body.lat,
        lon: req.body.lon,
        // lat: "56.18016",
        // lon: "42.89412",
        type: "commCenter",
        description: req.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.json(commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function updateCommCenter(req, res) {
  console.log("function updateCommCenter");
  try {
    const commCenter = await db.CommunicationCenters.findByPk(req.params.id);
    if (commCenter == null) {
      return res.status(400).send({ message: "Станция не найден ..." });
    }

    if (req.body.path) {
      const commCenterByPath = await db.CommunicationCenters.findOne({
        where: { path: req.body.path },
      });
      if (commCenterByPath && commCenterByPath.id !== req.params.id) {
        return res.status(422).send({
          pathError: "Станция с таким идентификатором уже существует",
        });
      }
      if (commCenter.path !== req.body.path) {
        const controllers = await db.Controllers.findAll({
          where: { commCenterPath: commCenter.path },
        });
        controllers.forEach((contr, i) => {
          console.log(contr);
          db.Controllers.update(
            { commCenterPath: req.body.path },
            {
              where: { modbusId: contr.dataValues.modbusId },
            }
          );
        });
        commCenter.path = req.body.path;
      }
    }

    if (req.body.name) {
      const commCenterByName = await db.CommunicationCenters.findOne({
        where: { name: req.body.name },
      });
      if (commCenterByName && commCenterByName.id !== req.params.id) {
        return res
          .status(422)
          .send({ nameError: "Станция с таким именем уже существует" });
      }
      commCenter.name = req.body.name;
    }

    if (req.body.description) {
      commCenter.description = req.body.description;
    }
    let willUpdateMapPolylinePoint_Coords = false;
    let willUpdateMapPolylinePoint_Index = false;

    if (req.body.index) {
      if (
        !Number(req.body.index) ||
        String(req.body.index).slice(-2) !== "00" ||
        Number(req.body.index) < 0
      ) {
        return res.status(422).send({
          indexError:
            "Поле должно содержать только натуральное число, которое заканчивается на 00",
        });
      }
      const commCenterByIndex = await db.CommunicationCenters.findOne({
        where: { index: req.body.index },
      });
      if (commCenterByIndex && commCenterByIndex.id !== req.params.id) {
        return res
          .status(422)
          .send({ indexError: "Станция с таким индексом уже существует" });
      }
      if (req.body.index !== commCenter.index) {
        willUpdateMapPolylinePoint_Index = true;
        commCenter.index = req.body.index;
      }
    }

    if (req.body.lat) {
      if (!validateLatLon(req.body.lat)) {
        return res
          .status(400)
          .send({ latError: "wrong lat format " + req.body.lat });
      }
      if (req.body.lat !== commCenter.lat) {
        willUpdateMapPolylinePoint_Coords = true;
        commCenter.lat = req.body.lat;
      }
    }

    if (req.body.lon) {
      if (!validateLatLon(req.body.lon)) {
        return res
          .status(400)
          .send({ lonError: "wrong lon format " + req.body.lon });
      }
      if (req.body.lon !== commCenter.lon) {
        willUpdateMapPolylinePoint_Coords = true;
        commCenter.lon = req.body.lon;
      }
    }

    if (req.body.tablePosition) {
      commCenter.tablePosition = req.body.tablePosition;
    }

    if (willUpdateMapPolylinePoint_Index && willUpdateMapPolylinePoint_Coords) {
      return res
        .status(400)
        .send({ message: "нельзя одновременно менять индекс и координаты" });
    }

    await commCenter.save();

    if (
      !willUpdateMapPolylinePoint_Index &&
      willUpdateMapPolylinePoint_Coords
    ) {
      await db.MapPolylinePoints.update(
        {
          lat: commCenter.lat,
          lon: commCenter.lon,
        },
        {
          where: {
            index: commCenter.index,
          },
        }
      );
    }

    if (
      willUpdateMapPolylinePoint_Index &&
      !willUpdateMapPolylinePoint_Coords
    ) {
      // create new point for display line on map
      await db.MapPolylinePoints.update(
        {
          index: commCenter.index,
        },
        {
          where: {
            lat: commCenter.lat,
            lon: commCenter.lon,
          },
        }
      );
    }

    return res.json(commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteCommCenterByPath(req, res) {
  console.log("function deleteCommCenter");
  try {
    const commCenter = await db.CommunicationCenters.findByPk(req.params.id);
    if (commCenter == null) {
      return res
        .status(400)
        .send({ message: "CommunicationCenter by this id not found" });
    }

    const controllers = await db.Controllers.findAll({
      where: { commCenterPath: commCenter.path },
    });

    await db.Fuel_Journals.destroy({
      where: { commCenterId: commCenter.id },
    });
    await db.Nasosi_Journals.destroy({
      where: { commCenterId: commCenter.id },
    });
    await db.Avarii_Journals.destroy({
      where: { commCenterId: commCenter.id },
    });
    await db.Donesenii_Journals.destroy({
      where: { commCenterId: commCenter.id },
    });
    await db.MapPolylinePoints.destroy({
      where: { lat: commCenter.lat, lon: commCenter.lon },
    });
    await db.Controllers.destroy({
      where: { commCenterPath: commCenter.path },
    });

    controllers.forEach((contr, i) => {
      db.Registers_Controllers_values.destroy({
        where: { controllerModbusId: contr.modbusId },
      });
    });

    await commCenter.destroy();
    res.json({ massage: `commCenter with id ${commCenter.path} deleted` });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getMapCommCenters,
  getCommCenterById,
  getCommCenterByPath,
  createCommCenter,
  updateCommCenter,
  deleteCommCenterByPath,
  getCommCenterControllersRegs,
};
