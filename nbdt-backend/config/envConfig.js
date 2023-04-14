const dotenv = require("dotenv");
const { resolve } = require("path");

if (process.env.NODE_ENV) {
  const envKeys = resolve(__dirname, `../.env.${process.env.NODE_ENV}`);
  dotenv.config({
    path: envKeys,
  });
} else {
  dotenv.config();
}
console.log(process.env.DB_CONNECT);

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_NAME: process.env.APP_NAME || "nbdt",
  DEFAULT_CATEGORY_TYPE: process.env.DEFAULT_CATEGORY_TYPE || "localhost",
  DEFAULT_FOLDER_NAME: process.env.DEFAULT_FOLDER_NAME || "localhost",
  DB_CONNECT: process.env.DB_CONNECT || "localhost",
  JWT_SECRET: process.env.JWT_SECRET || 3000,
  GOOGLE_STORAGE_URL: process.env.GOOGLE_STORAGE_URL || "",
  GOOGLE_STORAGE_BUCKET: process.env.GOOGLE_STORAGE_BUCKET || "staging",
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID || "",
};
