const Asset = require("../models/asset-models/assets");
const AssetStorageHandler = require("./AssetStorageHandler");

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
};

const deleteAssetFromDB = async (image_url) => {
  await Asset.findOne({
    image_url: image_url.toString(),
  }).then((asset) => {
    if (asset) {
      AssetStorageHandler.deletePhoto(asset.file_id);
      Asset.findByIdAndRemove(asset._id);
    }
  });
};

module.exports = { createAssetInDB, deleteAssetFromDB };
