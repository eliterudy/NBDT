var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const Restaurant = require("../../models/food-models/restaurants");
const authenticate = require("../../config/authenticate");
const AssetStorageHandler = require("../../utils/AssetStorageHandler");
const Asset = require("../../models/asset-models/assets");
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
  .put(cors.corsWithOptions, (req, res, next) =>
    response403("PUT", "/food/restaurants/", res)
  )
  .patch(cors.corsWithOptions, (req, res, next) =>
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

  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /food/crawlers/id/" +
        req.params.restaurant_id
    );
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "PUT operation not supported on /food/crawlers/id/" +
        req.params.restaurant_id
    );
  })
  .patch(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      Restaurant.findById(req.params.restaurant_id)
        .then(async (restaurant) => {
          if (!restaurant) {
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error: "This restautant does not exist in the system.",
            });
          }
          if (req.body.cover_url) {
            await deleteAssetFromDB(restaurant.image_url);
          }

          Restaurant.findByIdAndUpdate(
            req.params.restaurant_id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((restaurant_new) => {
              if (!restaurant_new) {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                return res.json({
                  error: "This restautant does not exist in the system.",
                });
              } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                return res.json(restaurant_new);
              }
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
          if (!restaurant) {
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error: "This restaurant does not exist in the system.",
            });
          }
          await deleteAssetFromDB(restaurant.image_url);

          FoodCrawler.findByIdAndRemove(restaurant._id)
            .then((resp) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(resp);
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

module.exports = foodCrawlerRouter;
