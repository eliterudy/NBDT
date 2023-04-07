const envConfig = require("./envConfig");
const gcpConfig = require("./gcpConfig");
const multerConfig = require("./multerConfig");

module.exports = { ...envConfig, ...gcpConfig, ...multerConfig };
