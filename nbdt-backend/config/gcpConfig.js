const { resolve } = require("path");
const Cloud = require("@google-cloud/storage");
const gcpServiceKey = resolve(__dirname, `../secrets/keys.json`);

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: gcpServiceKey,
  projectId: "your project id",
});

module.exports = { storage };
