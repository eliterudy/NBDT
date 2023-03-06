var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const FoodCrawler = require("../../models/food-models/foodCrawlers");
const authenticate = require("../../config/authenticate");
const { deleteAssetFromDB } = require("../../utils/DBManagementHelpers");
const {
  response500,
  response401,
  response404,
  response403,
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
    FoodCrawler.find({})
      .then((list) => {
        FoodCrawler.count({}).then(
          (count) => {
            return response200(
              {
                results: list,
                count,
              },
              res
            );
          },
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
      FoodCrawler.create(req.body).then(
        (crawler) => {
          if (!crawler)
            return response500(
              "",
              res,
              "We failed to add this food crawler to the system."
            );
          else return response200(crawler, res);
        },
        (err) => {
          next(err);
        }
      );
    }
  )
  .put(cors.corsWithOptions, (req, res) =>
    response403("PUT", "/food/crawlers/", res)
  )
  .patch(cors.corsWithOptions, (req, res) =>
    response403("PATCH", "/food/crawlers/", res)
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      await FoodCrawler.find({})
        .then((list) => {
          if (!list)
            return response404("", res, "No match found in the system.");
          list.map(async (e) => {
            console.log(e);
            await deleteAssetFromDB(e.poster_url);
          });
        })
        .catch((err) => next(err));
      FoodCrawler.deleteMany({})
        .then((resp) => {
          return response200(resp, res);
        })
        .catch((err) => next(err));
    }
  );

foodCrawlerRouter
  .route("/id/:food_crawler_id")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    FoodCrawler.findById(req.params.food_crawler_id)
      .then((food_crawler) => {
        response200(food_crawler, res);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res) =>
    response403("POST", "/food/crawlers/id/" + req.params.food_crawler_id, res)
  )
  .put(cors.corsWithOptions, (req, res) =>
    response403("PUT", "/food/crawlers/id/" + req.params.food_crawler_id, res)
  )
  .patch(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      FoodCrawler.findById(req.params.food_crawler_id).then(
        async (food_crawler) => {
          if (!food_crawler) return response404("food crawler", res, null);

          if (req.body.poster_url)
            await deleteAssetFromDB(food_crawler.poster_url);

          FoodCrawler.findByIdAndUpdate(
            req.params.food_crawler_id,
            {
              $set: req.body,
            },
            { new: true }
          )
            .then((food_crawler_new) => {
              if (!food_crawler_new)
                return response400("food crawler", res, null);

              return response200(food_crawler_new, res);
            })
            .catch((err) => next(err));
        }
      );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      FoodCrawler.findById(req.params.food_crawler_id)
        .then(async (food_crawler) => {
          if (!food_crawler) return response400("food crawler", res, null);

          await deleteAssetFromDB(food_crawler.poster_url);

          FoodCrawler.findByIdAndRemove(food_crawler._id)
            .then((resp) => response200(resp, res))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  );

module.exports = foodCrawlerRouter;
