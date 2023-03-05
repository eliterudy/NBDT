var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const FoodCrawler = require("../../models/food-models/foodCrawlers");
const authenticate = require("../../config/authenticate");
const AssetStorageHandler = require("../../utils/AssetStorageHandler");
const Asset = require("../../models/asset-models/assets");

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
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              results: list,
              count,
            });
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
    AssetStorageHandler.multerConfig().single("image"),
    async (req, res, next) => {
      if (!req.file) {
        return res.status(401).json({ error: "Please provide an image" });
      }
      var uploadResponse = await AssetStorageHandler.uploadPhoto(
        req.file,
        "food",
        "food-crawlers",
        720,
        720
      );

      if (uploadResponse.success) {
        Asset.create(uploadResponse.result).then(
          (asset) => {
            const foodCrawl = {
              ...req.body,
              image_url: uploadResponse.result.image_url,
            };
            delete foodCrawl.image;
            FoodCrawler.create(foodCrawl)
              .then(
                (crawler) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(crawler);
                },
                (err) => {
                  next(err);
                }
              )
              .catch((err) => next(err));
          },
          (err) => next(err)
        );
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: "Image could not be saved/uploaded" });
        return;
      }
    }
  )
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /food/crawlers/");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      FoodCrawler.find({})
        .then((list) => {
          list &&
            list.map((e) => {
              Asset.findOne({ image_url: e.image_url.toString() }).then(
                (asset) => {
                  if (asset) {
                    AssetStorageHandler.deletePhoto(asset.file_id);
                    Asset.findByIdAndRemove(asset._id);
                  }
                }
              );
            });
        })
        .catch((err) => next(err));
      FoodCrawler.remove({})
        .then((resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
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
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food_crawler);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /food/crawlers/id/" +
        req.params.food_crawler_id
    );
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    AssetStorageHandler.multerConfig().single("image"),
    async (req, res, next) => {
      FoodCrawler.findById(req.params.food_crawler_id)
        .then(async (food_crawler) => {
          if (!food_crawler) {
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error: "This food crawler does not exist in the system.",
            });
          } else {
            if (req.file) {
              var upload_response = await AssetStorageHandler.uploadPhoto(
                req.file,
                "food",
                "food-crawlers",
                720,
                720
              );

              if (!upload_response.success) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  error:
                    "Image could not be saved/uploaded. Kindly check the image and resend this request.",
                });
                return;
              } else {
                await Asset.findOne({
                  image_url: food_crawler.image_url.toString(),
                }).then(async (asset) => {
                  if (!asset) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                      error: "Could not upload the image to server.",
                    });
                    return;
                  }
                  await AssetStorageHandler.deletePhoto(asset.file_id);
                  await Asset.findByIdAndRemove(asset._id);

                  await Asset.create(upload_response.result)
                    .then((new_asset) => {
                      if (!new_asset) {
                        res.setHeader("Content-Type", "application/json");
                        res.json({
                          error: "Failed to replace new image",
                        });
                        return;
                      } else {
                        req.body = {
                          ...req.body,
                          image_url: upload_response.result.image_url,
                        };
                      }
                      delete req.body.image;
                    })
                    .catch((err) => next(err));
                });
              }
            }

            FoodCrawler.findByIdAndUpdate(
              req.params.food_crawler_id,
              {
                $set: req.body,
              },
              { new: true }
            ).then((food_crawler_new) => {
              if (!food_crawler_new) {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                return res.json({
                  error: "This food crawler does not exist in the system.",
                });
              } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                return res.json(food_crawler_new);
              }
            });
          }
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      FoodCrawler.findById(req.params.food_crawler_id)
        .then(async (food_crawler) => {
          if (!food_crawler) {
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            return res.json({
              error: "This food crawler does not exist in the system.",
            });
          }
          await Asset.findOne({
            image_url: food_crawler.image_url.toString(),
          }).then((asset) => {
            if (asset) {
              AssetStorageHandler.deletePhoto(asset.file_id);
              Asset.findByIdAndRemove(asset._id);
            }
          });

          FoodCrawler.findByIdAndRemove(food_crawler._id)
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
