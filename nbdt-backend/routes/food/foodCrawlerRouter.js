var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");

var foodCrawlerRouter = express.Router();
foodCrawlerRouter.use(bodyParser.json());

foodCrawlerRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

module.exports = foodCrawlerRouter;
