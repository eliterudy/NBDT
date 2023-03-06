var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const Restaurant = require("../../models/food-models/restaurants");
const authenticate = require("../../config/authenticate");
const { deleteAssetFromDB } = require("../../utils/DBManagementHelpers");
const {
  response500,
  response401,
  response404,
  response403,
  response200,
} = require("../../utils/ResponseHelpers");

var restaurantRouter = express.Router();
restaurantRouter.use(bodyParser.json());

restaurantRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

restaurantRouter
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
            else return response200(restaurant, res);
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
    async (req, res, next) => {
      console.log("here");
      await Restaurant.find({})
        .then(async (list) => {
          if (!list)
            return response404("", res, "No match found in the system.");
          await list.map(async (e) => {
            console.log(e);
            await deleteAssetFromDB(e.poster_url);
            await deleteAssetFromDB(e.logo_url);
            await deleteAssetFromDB(e.banner_url);
            return;
          });
        })
        .catch((err) => next(err));
      Restaurant.deleteMany({})
        .then((resp) => response200(resp, res))
        .catch((err) => next(err));
    }
  );

restaurantRouter
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

          await deleteAssetFromDB(restaurant.poster_url);
          await deleteAssetFromDB(restaurant.logo_url);
          await deleteAssetFromDB(restaurant.banner_url);

          Restaurant.findByIdAndRemove(restaurant._id)
            .then((resp) => response200(resp, res))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

module.exports = restaurantRouter;
