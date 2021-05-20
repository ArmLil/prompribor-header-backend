"use strict";

var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    // origin: "http://localhost:8081",
    origin: "http://172.28.1.88:8081",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("socketio", io);

require("dotenv").config();
var exphbs = require("express-handlebars");
const logger = require("morgan");
const bodyParser = require("body-parser");
//Import routes
let api = require("./routes/api")();
var db = require("./models");

var cors = require("cors");
app.use(cors());

// Log requests to the console.
logger.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  logger(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));
app.get("/", function (req, res) {
  console.log("app.get(/)");
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/v1/", function (req, res) {
  res.send("Система мониторинга нефтепроводов");
});

app.use("/api/v1/", api);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", "public/views");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

io.on("connection", function (socket) {
  console.log("user connected...");
  socket.emit("connection", { hello: "connected" });
  socket.on("my other event", function (data) {
    console.log("this is on server side", data);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

//temporary code for experiment
// const positions = [
//   { latlen: [56.301768, 42.68965] },
//   { latlen: [56.301568, 42.68765] },
//   { latlen: [56.301, 42.688] },
//   { latlen: [56.3, 42.689] },
//   { latlen: [56.299, 42.69] },
//   { latlen: [56.298, 42.692] },
//   { latlen: [56.298, 42.693] },
//   { latlen: [56.2978, 42.6934] },
//   { latlen: [56.2973, 42.6937] },
//   { latlen: [56.2973, 42.694] },
//   { latlen: [56.297, 42.695] },
//   ////
//   { latlen: [56.2965, 42.696] },
//   { latlen: [56.2965, 42.696] },
//   { latlen: [56.2965, 42.696] },
// ];
//
// let i = 0;
// let up = true;
//
// setInterval(() => {
//   if (i === positions.length - 1) {
//     up = false;
//   }
//   if (i === 0) {
//     up = true;
//   }
//   if (up) {
//     i += 1;
//   } else {
//     i -= 1;
//   }
//   io.emit("carPostion", positions[i]);
// }, 3000);

const port = process.env.PORT || 3002;
// const host = process.env.HOST || "127.0.0.1";
const host = process.env.HOST || "172.28.1.88";

// server.listen(port, '172.28.2.35', function() {
//   console.log(`server listening on port ${port}`);
//   // db.sequelize.sync();
// });

server.listen(port, host, function () {
  console.log(`server listening on port ${port}`);
  // db.sequelize.sync();
});
