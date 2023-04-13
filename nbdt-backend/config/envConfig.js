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
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_NAME: process.env.APP_NAME || "nbdt",
  DEFAULT_CATEGORY_TYPE: process.env.DEFAULT_CATEGORY_TYPE || "localhost",
  DEFAULT_FOLDER_NAME: process.env.DEFAULT_FOLDER_NAME || "localhost",
  DB_CONNECT: process.env.DB_CONNECT || "localhost",
  JWT_SECRET: process.env.JWT_SECRET || 3000,
  IMAGEKIT_ID: process.env.IMAGEKIT_ID || 1234567890,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || 1234567890,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || 1234567890,
  IMAGEKIT_FOLDER: process.env.IMAGEKIT_FOLDER || 1234567890,
  GOOGLE_STORAGE_URL: process.env.GOOGLE_STORAGE_URL || "",
  GOOGLE_STORAGE_BUCKET: process.env.GOOGLE_STORAGE_BUCKET || "",
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID || "",
};
