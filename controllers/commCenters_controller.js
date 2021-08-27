"use strict";

let db = require("../models");

async function getMapCommCenters(req, res) {
  console.log("function getCommCenters");
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

async function getCommCenters(req, res) {
  console.log("function getCommCenters");
  try {
    let options = {};
    if (req.query.controller && req.query.controller == "include") {
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
        { model: db.Avarii_Journals, as: "avarii_journal_data" },
        { model: db.Donesenii_Journals, as: "donesenii_journal_data" },
        { model: db.Nasosi_Journals, as: "nasosi_journal_data" },
        {
          model: db.Fuel_Journals,
          as: "fuel_journal_data",
          // order: "date ASC",  order doese not work
        },
      ];
    }
    let commCenters = await db.CommunicationCenters.findAndCountAll(options);

    commCenters.rows.forEach((row, ind) => {
      row.fuel_journal_data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      row.nasosi_journal_data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      row.donesenii_journal_data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      row.avarii_journal_data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    });

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
      where: { commCenterPath: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let avarii_journal_data = await db.Avarii_Journals.findAndCountAll({
      where: { commCenterPath: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let donesenii_journal_data = await db.Donesenii_Journals.findAndCountAll({
      where: { commCenterPath: req.params.id },
      order: [["createdAt", "ASC"]],
    });
    let nasosi_journal_data = await db.Nasosi_Journals.findAndCountAll({
      where: { commCenterPath: req.params.id },
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
    // commCenter.fuel_journal_data = fuel_journal_data.rows;
    // await commCenter.avarii_journal_data = avarii_journal_data;
    // await commCenter.donesenii_journal_data = donesenii_journal_data;
    // await commCenter.nasosi_journal_data = nasosi_journal_data;

    await console.log("row195");

    res.json(_commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createCommCenter(req, res) {
  console.log("function CommCenter");
  try {
    let options = {};

    options.path = req.body.path;

    if (req.body.name) {
      let commCenter = await db.CommunicationCenters.findOne({
        where: { name: req.body.name },
      });
      if (commCenter) {
        return res
          .status(400)
          .send({ message: `Name ${req.body.name} already exists.` });
      }
      options.name = req.body.name;
    } else {
      return res.status(400).send({ message: "name required" });
    }

    if (req.body.description) {
      options.description = req.body.description;
    }
    if (req.body.status) {
      options.status = req.body.status;
    }
    if (req.body.index) {
      options.index = req.body.index;
    }
    if (req.body.lat) {
      options.lat = req.body.lat;
    }
    if (req.body.len) {
      options.len = req.body.len;
    }
    if (req.body.port) {
      options.port = req.body.port;
    }
    if (req.body.host) {
      //host must be unique
      let commCenter = await db.CommunicationCenters.findOne({
        where: { host: req.body.host },
      });
      if (commCenter) {
        return res
          .status(400)
          .send({ message: `Host ${req.body.host} already exists.` });
      }
      options.host = req.body.host;
    }

    const commCenter = await db.CommunicationCenters.findOrCreate({
      where: options,
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
      return res
        .status(400)
        .send({ message: "CommunicationCenter by this id not found" });
    }

    if (req.body.path) {
      commCenter.path = req.body.path;
    }
    if (req.body.name) {
      commCenter.name = req.body.name;
    }

    if (req.body.description) {
      commCenter.description = req.body.description;
    }
    if (req.body.status) {
      commCenter.status = req.body.status;
    }
    if (req.body.index) {
      commCenter.index = req.body.index;
    }
    if (req.body.lat) {
      commCenter.lat = req.body.lat;
    }
    if (req.body.len) {
      commCenter.len = req.body.len;
    }
    if (req.body.port) {
      commCenter.port = req.body.port;
    }

    if (req.body.host && commCenter.host != req.body.host) {
      //check host
      //do not let commCenter be updated with a host which already exists
      const findCommCenterByHost = await db.CommunicationCenters.findOne({
        where: { host: req.body.host },
      });
      if (findCommCenterByHost) {
        return res
          .status(400)
          .send({ message: `Host ${req.body.host} already exists.` });
      }
      commCenter.host = req.body.host;
    }

    await commCenter.save();
    res.json(commCenter);
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteCommCenter(req, res) {
  console.log("function deleteCommCenter");
  try {
    const commCenter = await db.CommunicationCenters.findByPk(req.params.id);
    if (commCenter == null) {
      return res
        .status(400)
        .send({ message: "CommunicationCenter by this id not found" });
    }
    await commCenter.destroy();
    res.json({ massage: `commCenter with id ${commCenter.path} deleted` });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getMapCommCenters,
  getCommCenters,
  getCommCenterById,
  createCommCenter,
  updateCommCenter,
  deleteCommCenter,
};
