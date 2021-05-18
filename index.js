"use strict";

var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8081",
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

// app.use(express.static(__dirname));
// app.get("/", function (req, res) {
//   console.log("app.get(/)");
//   res.sendFile(__dirname + "/index.html");
// });

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

const port = process.env.PORT || 3002;
const host = process.env.HOST || "127.0.0.1";

// server.listen(port, '172.28.2.35', function() {
//   console.log(`server listening on port ${port}`);
//   // db.sequelize.sync();
// });

server.listen(port, host, function () {
  console.log(`server listening on port ${port}`);
  // db.sequelize.sync();
});
