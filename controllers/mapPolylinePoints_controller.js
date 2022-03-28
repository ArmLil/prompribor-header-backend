"use strict";
const uuidv4 = require("uuid/v4");
let db = require("../models");
const line = require("../config/config.js")["line"];
const validateLatLon = require("./helpers/validateLatLon");

async function createMapPolylinePoint(req, res) {
  console.log("function createMapPolylinePoint");
  try {
    let options = {};

    if (req.body.type) {
      options.type = req.body.type;
    } else {
      return res.status(400).send({ message: "type required" });
    }

    if (req.body.index) {
      if (
        !Number(req.body.index) ||
        String(req.body.index).slice(-2) == "00" ||
        Number(req.body.index) < 0
      ) {
        return res.status(422).send({
          indexError:
            "Поле должно содержать только натуральное число, которое не заканчивается на 00",
        });
      }
      options.index = req.body.index;
      const polylinePoint = await db.MapPolylinePoints.findOne({
        where: { index: req.body.index },
      });
      if (polylinePoint) {
        return res.status(422).send({
          indexError: "Промежуточная точка с таким индексом уже существует",
        });
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

    if (req.body.description) {
      options.description = req.body.description;
    }

    /////create new mapPolylinePoint
    const mapPolylinePoint = await db.MapPolylinePoints.findOrCreate({
      where: options,
    });

    res.json(mapPolylinePoint);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function updateMapPolylinePoint(req, res) {
  console.log("function updateMapPolylinePoint");
  try {
    const polylinePoint = await db.MapPolylinePoints.findByPk(req.params.id);
    if (polylinePoint == null) {
      return res
        .status(400)
        .send({ message: "Промежуточная точка не найдена ..." });
    }

    if (req.body.type) {
      polylinePoint.type = req.body.type;
    }

    if (req.body.description) {
      polylinePoint.description = req.body.description;
    }
    let willUpdateMapPolylinePoint_Coords = false;
    let willUpdateMapPolylinePoint_Index = false;

    if (req.body.index) {
      const polylinePointByIndex = await db.MapPolylinePoints.findOne({
        where: { index: req.body.index },
      });
      if (polylinePointByIndex && polylinePointByIndex.id !== req.params.id) {
        return res.status(422).send({
          indexError: "Промежуточная точка с таким индексом уже существует",
        });
      }
      if (req.body.index !== polylinePoint.index) {
        willUpdateMapPolylinePoint_Index = true;
        polylinePoint.index = req.body.index;
      }
    }

    if (req.body.lat) {
      if (!validateLatLon(req.body.lat)) {
        return res
          .status(400)
          .send({ latError: "wrong lat format " + req.body.lat });
      }
      if (req.body.lat !== polylinePoint.lat) {
        willUpdateMapPolylinePoint_Coords = true;
        polylinePoint.lat = req.body.lat;
      }
    }

    if (req.body.lon) {
      if (!validateLatLon(req.body.lon)) {
        return res
          .status(400)
          .send({ lonError: "wrong lon format " + req.body.lon });
      }
      if (req.body.lon !== polylinePoint.lon) {
        willUpdateMapPolylinePoint_Coords = true;
        polylinePoint.lon = req.body.lon;
      }
    }

    if (willUpdateMapPolylinePoint_Index && willUpdateMapPolylinePoint_Coords) {
      return res
        .status(400)
        .send({ message: "нельзя одновременно менять индекс и координаты" });
    }

    await polylinePoint.save();
    return res.json(polylinePoint);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteMapPolylinePoint(req, res) {
  console.log("function deleteMapPolylinePoint");
  try {
    const polylinePoint = await db.MapPolylinePoints.findByPk(req.params.id);
    console.log({ polylinePoint }, polylinePoint == null);

    if (polylinePoint == null) {
      return res
        .status(400)
        .send({ message: "MapPolylinePoint by this id not found" });
    }

    await polylinePoint.destroy();
    res.json({
      massage: ` mapPolylinePoint with id ${polylinePoint.path} deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  createMapPolylinePoint,
  updateMapPolylinePoint,
  deleteMapPolylinePoint,
};
