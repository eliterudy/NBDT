var multer = require("multer");

const multerConfig = () =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
  });

module.exports = { multerConfig };
