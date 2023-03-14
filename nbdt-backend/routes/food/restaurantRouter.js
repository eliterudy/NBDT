var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");

var restaurantRouter = express.Router();
restaurantRouter.use(bodyParser.json());

restaurantRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

module.exports = restaurantRouter;
