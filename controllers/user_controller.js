"use strict";

let db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getUsers(req, res) {
  console.log("function getUsers");
  try {
    let users = await db.Users.findAndCountAll({
      attributes: { exclude: ["password"] },
    });

    res.json({
      users: users,
      count: users.count,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function getUsersById(req, res) {
  console.log("function getUsersById");
  try {
    let user = await db.Users.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}
async function getUserByToken(req, res) {
  console.log("function getUsersByToken");
  try {
    let user = await db.Users.findOne({
      where: {
        token: req.params.token,
      },
      attributes: { exclude: ["password"] },
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err.toString(),
    });
  }
}

async function createUser(req, res) {
  console.log("function createUsers");
  try {
    const createUser = {};
    if (!req.body.username) {
      return res.status("400").json({ message: "username required" });
    } else {
      const findUserByUsersname = await db.Users.findOne({
        where: { username: req.body.username },
      });
      if (findUserByUsersname) {
        return res.status("400").json({ message: "username already in use" });
      } else {
        createUser.username = req.body.username;
      }
    }
    if (!req.body.password) {
      return res.status("400").json({ message: "password required" });
    } else {
      createUser.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    if (req.body.name) {
      createUser.name = req.body.name;
    }
    if (req.body.secondName) {
      createUser.secondName = req.body.secondName;
    }
    if (req.body.fatherName) {
      createUser.fatherName = req.body.fatherName;
    }
    if (req.body.position) {
      createUser.position = req.body.position;
    }
    if (req.body.isAdmin) {
      createUser.isAdmin = req.body.isAdmin;
    }
    if (req.body.email) {
      createUser.email = req.body.email;
    }
    if (req.body.phone) {
      createUser.phone = req.body.phone;
    }

    const user = await db.Users.findOrCreate({
      where: createUser,
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(502).json({
      message: err,
    });
  }
}

async function updateUser(req, res) {
  console.log(req.body);
  try {
    const user = await db.Users.findByPk(req.params.id);
    if (!user) {
      return res
        .status("404")
        .json({ message: `User ${req.params.id} not found` });
    }

    if (user.username !== "Админ") {
      //check username
      //do not let user to update his username with a username which already exists
      if (req.body.username) {
        const findUserByUsersname = await db.Users.findOne({
          where: { username: req.body.username },
        });
        if (user.username !== req.body.username && findUserByUsersname) {
          return res.status("400").json({ message: "username already in use" });
        }
        user.username = req.body.username;
      }
      if (req.body.isAdmin !== null) {
        user.isAdmin = req.body.isAdmin;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, saltRounds);
      }
    } else {
      return res.status("400").json({
        message: "Для Админа редактирование никнейма, пароля и прав ограничено",
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.secondName) {
      user.secondName = req.body.secondName;
    }
    if (req.body.fatherName) {
      user.fatherName = req.body.fatherName;
    }
    if (req.body.position) {
      user.position = req.body.position;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }

    await user.save(user);
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

async function deleteUser(req, res) {
  console.log("function deleteUser");
  try {
    const user = await db.Users.findByPk(req.params.id);
    if (!user) {
      return res
        .status("404")
        .json({ message: `User ${req.params.id} not found` });
    }
    await user.destroy();
    res.json({
      massage: `user ${user.username}, ${user.email}, ${user.id} is deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ message: err.toString() });
  }
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
  getUserByToken,
};
