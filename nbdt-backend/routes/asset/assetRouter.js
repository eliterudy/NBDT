const express = require("express");
const bodyParser = require("body-parser");
const AssetStorageHandler = require("../../utils/AssetStorageHandler");
const Asset = require("../../models/asset-models/assets");
const {
  deleteAssetFromDB,
  createAssetInDB,
} = require("../../utils/DBManagementHelpers");
const {
  response500,
  response404,
  response200,
  response401,
} = require("../../utils/ResponseHelpers");
// recursive adder function for new assets to the database.

var assetRouter = express.Router();
assetRouter.use(bodyParser.json());

assetRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

/* api endpoint for /leaders */

assetRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    async (req, res, next) => {
      Asset.find({})
        .then((list) => {
          Asset.count({}).then(
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
    }
  )
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    AssetStorageHandler.multerConfig().single("image"),
    async (req, res, next) => {
      if (!req.file) {
        return response401("Please provide an image");
      }

      var upload_response = await AssetStorageHandler.uploadPhoto(
        req.file,
        req.body.path,
        720,
        720
      );

      if (!upload_response.success) {
        return response500("image", res, null);
      } else {
        await createAssetInDB(upload_response.result);
        return response200(upload_response.result, res);
      }
    }
  )
  .put(cors.corsWithOptions, (req, res, next) => {
    return response203("PUT", "/assets/", res);
  })
  .patch(cors.corsWithOptions, (req, res, next) => {
    return response203("PUT", "/assets/", res);
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      if (!req.body.asset_id) {
        return response401("Please provide asset _id for this asset.");
      }
      Asset.findById(req.body.id.toString())
        .then(
          async (asset) => {
            if (!asset) {
              return response404("asset", res, null);
            } else {
              await AssetStorageHandler.deletePhoto(asset.file_id);
              Asset.findByIdAndRemove(food_crawler._id)
                .then((resp) => {
                  return response200(resp, res);
                })
                .catch((err) => next(err));
            }
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  );

module.exports = assetRouter;
