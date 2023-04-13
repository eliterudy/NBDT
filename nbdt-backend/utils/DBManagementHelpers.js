const Asset = require("../models/asset-models/assets");
const AssetStorageHandler = require("./AssetStorageHandler");
const {
  response500,
  response401,
  response404,
  response403,
  response200,
} = require("./ResponseHelper");
const createAssetInDB = async (asset_data) => {
  await Asset.create(asset_data)
    .then(async (asset) => {
      if (!asset) {
        return await createAssetInDB(asset_data);
      } else {
        return asset;
      }
    })
    .catch((err) => next(err));
  return null;
};

const deleteAssetFromDB = async (image_url) => {
  await Asset.findOne({
    image_url: image_url.toString(),
  }).then(async (asset) => {
    if (asset) {
      await AssetStorageHandler.deletePhoto(asset.file_id, asset.file_path);
      return await Asset.findByIdAndRemove(asset._id.toString());
    }
  });
};

module.exports = { createAssetInDB, deleteAssetFromDB };
