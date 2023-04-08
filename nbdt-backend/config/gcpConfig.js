const { resolve } = require("path");
const Cloud = require("@google-cloud/storage");
const gcpServiceKey = resolve(__dirname, `../secrets/gcp-storage-key.json`);
const Configs = require("./index");
const { Storage } = Cloud;
const gcpStorage = new Storage({
  keyFilename: gcpServiceKey,
  projectId: Configs.GOOGLE_PROJECT_ID,
});

module.exports = { gcpStorage };
