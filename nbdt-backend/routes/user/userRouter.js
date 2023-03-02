var express = require("express");
const bodyParser = require("body-parser");
var passport = require("passport");
var path = require("path");
const Article = require("../models/articles");
const User = require("../models/users");
const authenticate = require("../config/authenticate");
const cors = require("../config/cors");
const UserPropUpdate = require("../components/UserPropUpdate");
const DataTrimmer = require("../components/DataTrimmer");
const UploadFile = require("../components/UploadFile");

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

/* GET users listing. */
userRouter.get(
  "/",
  cors.corsWithOptions,

  (req, res, next) => {
    var filters = {
      $or: [
        {
          firstname: {
            $regex: req.query.search
              ? req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "")
              : "",
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: req.query.search
              ? req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "")
              : "",
            $options: "i",
          },
        },
      ],
      // admin: false,
    };

    User.find(filters)
      .then(
        (users) => {
          if (users) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              results: DataTrimmer.trimAuthorList(users),

              count,
            });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

userRouter.post("/signup", cors.cors, async (req, res, next) => {
  // register is a passport method
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.is_admin = req.body.is_admin || false;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ error: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

userRouter.post("/signin", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.json(info);
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        return res.json({
          err: "Could not log in user!",
        });
      }

      var token = authenticate.getToken({ _id: req.user._id });
      User.findById(req.user._id)
        .then(
          (user) => {
            const { _id, firstname, lastname, username } = user;
            var userDetails = {
              _id,
              firstname,
              lastname,
              username,
            };
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              token: token,
              user: userDetails,
            });
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    });
  })(req, res, next);
});

userRouter.get("/checkJWTtoken", cors.corsWithOptions, (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid!", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, user: user });
    }
  })(req, res);
});

module.exports = userRouter;
