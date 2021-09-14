require("dotenv").config();

module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    operatorsAliases: 0,
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
  },
  socketDomains: [],
  // journals_interval: 10000, //3600000
  journals_interval: 3600000,
  line: "150",
  // client_IP: "172.28.1.88",
  client_IP: "localhost:8081",
  update_commCenters_interval: 3000,
};
