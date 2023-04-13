const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../../utils/authenticate");
const AssetStorageHandler = require("../../utils/AssetStorageHandler");
const Asset = require("../../models/asset-models/assets");
const cors = require("../../config/cors");
const { createAssetInDB } = require("../../utils/DBManagementHelpers");
const {
  response500,
  response401,
  response404,
  response200,
} = require("../../utils/ResponseHelper");

const Configs = require("../../config/index");
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
    Configs.multerConfig().single("image"),
    async (req, res) => {
      if (!req.file) {
        return response401("Please provide an image", res);
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
        const AssetInfo = await createAssetInDB(upload_response.result);
        return response200(AssetInfo ? AssetInfo : upload_response.result, res);
      }
    }
  )
  .put(cors.corsWithOptions, (req, res) => {
    return response203("PUT", "/assets/", res);
  })
  .patch(cors.corsWithOptions, (req, res) => {
    return response203("PATCH", "/assets/", res);
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      if (!req.body.file_id)
        return response401(
          "Please provide both: the file_id for this asset.",
          res
        );

      Asset.findOne({
        file_id: req.body.file_id.toString(),
      })
        .then(
          async (asset) => {
            if (!asset) {
              return response404("asset", res, null);
            } else {
              await AssetStorageHandler.deletePhoto(
                asset.file_id,
                asset.file_path
              );
              Asset.findByIdAndRemove(asset._id.toString())
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
