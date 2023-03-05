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
                  if (err.code == 11000) {
                    Asset.findById(asset._id.toString()).then((asset) => {
                      if (asset) {
                        AssetStorageHandler.deletePhoto(asset.file_id);
                        Asset.findByIdAndRemove(asset._id);
                      }
                    });
                    res.statusCode = 400;
                    res.setHeader("Content-Type", "application/json");
                    return res.json({
                      error:
                        "There is another crawler with the same name. We cannot have duplicate ",
                    });
                  }
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
          res.json({ success: true, deleted: resp });
        })
        .catch((err) => next(err));
    }
  );

module.exports = foodCrawlerRouter;
