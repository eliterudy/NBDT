var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const Restaurant = require("../../models/food-models/restaurants");
const authenticate = require("../../config/authenticate");
const { deleteAssetFromDB } = require("../../utils/DBManagementHelpers");
const {
  response500,
  response404,
  response200,
} = require("../../utils/ResponseHelpers");

var foodCrawlerRouter = express.Router();
foodCrawlerRouter.use(bodyParser.json());

foodCrawlerRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

foodCrawlerRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Restaurant.find({
      name: {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      },
    })
      .then((list) => {
        if (!list) return response404("", res, "No match found in the system.");

        Restaurant.count({
          name: {
            $regex: req.query.search ? req.query.search : "",
            $options: "i",
          },
        }).then(
          (count) =>
            response200(
              {
                results: list,
                count,
              },
              res
            ),
          (err) => next(err)
        );
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      Restaurant.create(req.body)
        .then(
          (restaurant) => {
            if (!restaurant)
              return response500(
                "",
                res,
                "We failed to add this restaurant to the system."
              );
            else return response200(restaurant);
          },
          (err) => {
            next(err);
          }
        )
        .catch((err) => next(err));
    }
  )
  .put(cors.corsWithOptions, (req, res) =>
    response403("PUT", "/food/restaurants/", res)
  )
  .patch(cors.corsWithOptions, (req, res) =>
    response403("PATCH", "/food/restaurants/", res)
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Restaurant.find({})
        .then((list) => {
          if (!list)
            return response404("", res, "No match found in the system.");
          list.map(async (e) => await deleteAssetFromDB(e.image_url));
        })
        .catch((err) => next(err));
      Restaurant.remove({})
        .then((resp) => response200(resp, res))
        .catch((err) => next(err));
    }
  );

foodCrawlerRouter
  .route("/id/:restaurant_id")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Restaurant.findById(req.params.restaurant_id)
      .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(restaurant);
      })
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, (req, res) =>
    response403("POST", "/food/restaurants/id/" + req.params.restaurant_id, res)
  )
  .put(cors.corsWithOptions, (req, res) =>
    response403("PUT", "/food/restaurants/id/" + req.params.restaurant_id, res)
  )
  .patch(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      Restaurant.findById(req.params.restaurant_id)
        .then(async (restaurant) => {
          if (!restaurant) return response404("restaurant", res, null);

          if (req.body.poster_url && req.body.poster_url.length > 5)
            await deleteAssetFromDB(restaurant.poster_url);

          if (req.body.logo_url && req.body.logo_url.length > 5)
            await deleteAssetFromDB(restaurant.logo_url);

          if (req.body.banner_url && req.body.banner_url.length > 5)
            await deleteAssetFromDB(restaurant.banner_url);

          Restaurant.findByIdAndUpdate(
            req.params.restaurant_id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((restaurant_new) => {
              if (!restaurant_new) return response404("restaurant", res, null);
              return response200(restaurant_new, res);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      Restaurant.findById(req.params.restaurant_id)
        .then(async (restaurant) => {
          if (!restaurant) return response404("restaurant", res, null);

          await deleteAssetFromDB(restaurant.image_url);

          Restaurant.findByIdAndRemove(restaurant._id)
            .then((resp) => response200(resp, res))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

module.exports = foodCrawlerRouter;
