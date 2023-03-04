var express = require("express");
const bodyParser = require("body-parser");
const cors = require("../../config/cors");
const FoodCrawler = require("../../models/food/foodCrawlers");
const authenticate = require("../../config/authenticate");
const UploadFile = require("../../utils/UploadFile");

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
    UploadFile.multerConfig().single("image"),
    async (req, res, next) => {
      if (!req.file) {
        return res.status(401).json({ error: "Please provide an image" });
      }
      var uploadResponse = await UploadFile.uploadPhoto(
        req.file,
        "food",
        "food-crawlers",
        720,
        720
      );

      if (uploadResponse.success) {
        const foodCrawl = { ...req.body, image_url: uploadResponse.url };
        delete foodCrawl.image;
        console.log(foodCrawl);
        FoodCrawler.create(foodCrawl)
          .then(
            (crawler) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(crawler);
            },
            (err) => {
              if (err.code == 11000) {
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
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: "Image could not be saved/uploaded" });
        return;
      }
    }
  )
  .put();

module.exports = foodCrawlerRouter;
