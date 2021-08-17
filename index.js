"use strict";

var express = require("express");
var app = express();
const client_IP = require("./config/config.js")["client_IP"];

var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    // origin: "http://localhost:8081",
    origin: "http://" + "client_IP",
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

const journals_interval = require("./config/config.js")["journals_interval"];
const fill_journals = require("./workers/autoFill_journals");
setTimeout(() => fill_journals(io), 2000);
setInterval(() => fill_journals(io), journals_interval);

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

app.get("/", function (req, res) {
  console.log("app.get(/)");
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/v1/", function (req, res) {
  res.send("Система мониторинга нефтепроводов");
});

app.use("/api/v1/", api);
app.use(express.static("public"));

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
  console.log("user connected...", socket.handshake.headers);
  socket.emit("connection", { hello: "connected" });
  socket.on("my other event", function (data) {
    console.log("this is on server side", data);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

//temporary code for experiment
const positions = [
  { latlen: [56.3017, 42.6872] },
  { latlen: [56.301568, 42.68765] },
  { latlen: [56.3013, 42.6878] },
  { latlen: [56.301, 42.6881] },
  { latlen: [56.301, 42.688] },
  { latlen: [56.3, 42.69] },
  { latlen: [56.2995, 42.692] },
  { latlen: [56.2992, 42.692] },
  { latlen: [56.299, 42.6925] },
  { latlen: [56.2986, 42.6939] },
  { latlen: [56.2982, 42.6948] },
  { latlen: [56.298, 42.6949] },
  { latlen: [56.2978, 42.6959] },
  { latlen: [56.2974, 42.6966] },
  { latlen: [56.2972, 42.6968] },
  { latlen: [56.2971, 42.697] },
  { latlen: [56.2968, 42.6979] },
  { latlen: [56.2962, 42.6999] },
  { latlen: [56.296, 42.6999] },
  { latlen: [56.2958, 42.7005] },
  { latlen: [56.2955, 42.701] },
  { latlen: [56.295, 42.7019] },
];

let i = 0;
let up = true;

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
// }, 2000);

const port = process.env.PORT || 3002;
const host = process.env.HOST || client_IP;
// const host = process.env.HOST || "127.0.0.1";
// const host = process.env.HOST || "172.28.1.88";

// server.listen(port, '172.28.2.35', function() {
//   console.log(`server listening on port ${port}`);
//   // db.sequelize.sync();
// });

server.listen(port, host, function () {
  console.log(`server listening on port ${port}, host ${host}`);
  // db.sequelize.sync();
});
