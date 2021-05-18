let db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailSender = require("./email_notification_controller");
const saltRounds = 10;
// 60 * 60 * 24 = 1 day
const expireTime = 60 * 60 * 24 * 5;

function checkauth(req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-auth"] ||
    req.headers["x-access-token"];

  // Get auth header value if it is bearer
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    token = bearerToken;
  }
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Token is not provided" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.error(err);
      return res.status(403).json({
        message: err,
      });
    } else {
      db.Users.findOne({
        where: {
          id: decoded.data.id,
        },
      })
        .then((user) => {
          if (!user) {
            return res
              .status(403)
              .json({ message: "Users with this token does not exist" });
          } else if (!user.email_confirmed) {
            // to disable email confirmation discomment next 3 lines of code

            req.user = decoded;
            console.log("Token is valid", decoded);
            return next();

            // emailSender(user.dataValues, req.headers.host, token, result => {
            //   if (result.message) {
            //     res.json(result);
            //   } else {
            //     res.json({ data: { user, token, message: result.message } });
            //   }
            // });
          } else {
            req.user = decoded;
            console.log("Token is valid", decoded);
            return next();
          }
        })
        .catch((err) => {
          console.error("Opps", error);
          res.json({
            message: err,
          });
        });
    }
  });
}

// to disable the auth for all the endpoints comment the
// previous function checkauth and discomment this fake checkauth
// function checkauth(req, res, next) {
//   next()
// }

async function signup(req, res) {
  console.log("function signup");
  try {
    const findUsersByUsersname = await db.Users.findOne({
      where: { username: req.body.username },
    });
    if (findUsersByUsersname) {
      return res.status(403).json({
        message: "Пользователь с таким никнеймом уже зарегистрирован.",
      });
    }

    const findUsersByEmail = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (findUsersByEmail) {
      return res.status(403).json({
        message: "Пользователь с таким е-майлом уже зарегистрирован.",
      });
    }

    const user = await db.Users.findOrCreate({
      where: { username: req.body.username, email: req.body.email },
      defaults: {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
      },
    });

    const { id, username, email, email_confirmed } = user[0].dataValues;
    let token = jwt.sign(
      {
        data: {
          id,
          username,
          email,
          email_confirmed,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: expireTime }
    );

    await delete user[0].dataValues.password;

    // to disable email confirmation comment these emailSender part and then
    // discomment res.json({ data: { user, token }}); or vice versa

    // await emailSender(user[0].dataValues, req.headers.host, token, result => {
    //   if (result.message) {
    //     return res.status(403).json(result);
    //   } else {
    //     res.json({ data: { user, token, message: result.message } });
    //   }
    // });

    res.json({
      user,
      token,
      message: `Пользователь ${user[0].username} успешно зарегистрирован.`,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: err,
    });
  }
}

async function login(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(403).json({
      message: "username or password is not provided",
    });
  }

  try {
    const user = await db.Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "Пользователь с указанным никнеймом не существует.",
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      let token = jwt.sign(
        {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            email_confirmed: user.email_confirmed,
            roleAdmin: user.roleAdmin,
          },
        },
        process.env.TOKEN_SECRET,
        { expiresIn: expireTime }
      );

      if (!user.email_confirmed) {
        // to disable email confirmation discomment next 5 lines of code or vice versa

        // req.user = decoded;
        // console.log("Token is valid", decoded);
        return res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          email_confirmed: user.email_confirmed,
          token,
          roleAdmin: user.roleAdmin,
        });

        // emailSender(user.dataValues, req.headers.host, token, result => {
        //   if (result.message) {
        //     return res.json(result);
        //   } else {
        //     return res.json({ data: { user, token, message: result.message } });
        //   }
        // });
      } else {
        return res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          email_confirmed: user.email_confirmed,
          token,
          roleAdmin: user.roleAdmin,
        });
      }
    } else {
      return res.status(403).json({
        message: "Пароль не валидный.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.json({
      message: err,
    });
  }
}

function emailConfirmation(req, res, next) {
  console.log("function emailConfirmation");

  jwt.verify(req.params.token, process.env.TOKEN_SECRET, function (
    err,
    decoded
  ) {
    if (err) {
      console.error(err);
      return res.status(403).json({
        message: err,
      });
    } else {
      db.Users.findByPk(decoded.data.id)
        .then((user) => {
          if (!user) res.status(403).json({ message: "user is not found" });
          user.email_confirmed = true;
          user.save(user);
          let token = jwt.sign(
            {
              data: {
                id: user.id,
                username: user.username,
                email: user.email,
                email_confirmed: user.email_confirmed,
                roleAdmin: user.roleAdmin,
              },
            },
            process.env.TOKEN_SECRET,
            { expiresIn: expireTime }
          );
          delete user.dataValues.password;
          next();
          // res.render('home', {user})
          // res.json({ data: { user, message: "email is confirmed", token } });
        })
        .catch((err) => {
          console.error("Opps", error);
          res.json({ message: err.toString() });
        });
    }
  });
}

function showHome(req, res) {
  res.statusCode = 302;
  res.setHeader("Location", "http://localhost:8081/home");
  res.end();
}

module.exports = {
  signup,
  login,
  checkauth,
  emailConfirmation,
  showHome,
};
