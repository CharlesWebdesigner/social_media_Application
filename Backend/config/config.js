const dotenv = require("dotenv");
dotenv.config();
// const {proPORT, Mongo_url, jwt } = require("../.env");
const config = {
  port: process.env.PORT,
  url: process.env.Mongo_url,
  jwtSecret: process.env.jwt,
};
module.exports = config;
