"use strict";

let db = require("../models");

async function getCommCenters(req, res) {
  console.log("function getCommCenters");
  try {
    let options = {};
    if (req.query.controller && req.query.controller == "include") {
      options.include = [{ model: db.Controllers, as: "controller" }];
    }
    let commCenters = await db.CommunicationCenters.findAndCountAll(options);
    let count = commCenters.count;

    res.json({
      commCenters,
      count,
    });
  } catch (err) {
    console.error(err);
    res.json({
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
      include: [{ model: db.Controllers, as: "controller" }],
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
    res.json({
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
    res.json({ message: err.toString() });
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
    res.json({ message: err.toString() });
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
    res.json({ message: err.toString() });
  }
}

module.exports = {
  getCommCenters,
  getCommCenterById,
  createCommCenter,
  updateCommCenter,
  deleteCommCenter,
};
