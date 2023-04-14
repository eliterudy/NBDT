var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var passport = require("passport");
var Configs = require("./config/index");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const { foodCrawlerRouter, restaurantRouter } = require("./routes/food/index");
const userRouter = require("./routes/user/userRouter");
const assetRouter = require("./routes/asset/assetRouter");

var mongoUrl = Configs.DB_CONNECT;

var connect = mongoose.connect(mongoUrl, {
  // strictQuery: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    retryWrites: true,
    w: "majority",
    j: true,
    wtimeout: 1000,
  },
  autoIndex: true, //make this also true
});

connect
  .then((db) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
var app = express();

// middleware to redirect to secureServer
app.all("*", (req, res, next) => {
  return next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/food/restaurants", restaurantRouter);
app.use("/food/crawlers", foodCrawlerRouter);
app.use("/assets", assetRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
