var multer = require("multer");

const multerConfig = () =>
  multer({
    limits: {
      fileSize: 40 * 720 * 720,
    },
  });

module.exports = { multerConfig };
