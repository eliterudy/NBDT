var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var passport = require("passport");
var config = require("./config/config");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const { foodCrawlerRouter } = require("./routes/food/index");

var mongoUrl = config.DB_CONNECT;
var connect = mongoose.connect(mongoUrl, {
  strictQuery: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true, //make this also true
});

connect.then((db) => {}).catch((err) => {});
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
// app.use("/users", usersRouter);
// app.use("/food/restaurants", restaurantRouter);
app.use("/food/crawlers", foodCrawlerRouter);

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
