var express = require("express");
const bodyParser = require("body-parser");

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

module.exports = userRouter;
