const cors = require("cors");

const whitelist = [
  "http://localhost:3000",
  "https://localhost:3443",
  "https://localhost:3001",
  "http://localhost:3001",
  "http://localhost:3002",
];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1 || !req.header("Origin")) {
    corsOptions = {
      origin: true,
    };
  } else {
    corsOptions = {
      origin: false,
    };
  }
  callback(null, corsOptions);
};

module.exports = { cors: cors(), corsWithOptions: cors(corsOptionsDelegate) };
