const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
      default: "",
    },
    file_id: {
      type: String,
      default: "",
      required: true,
    },
    file_path: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

var Assets = mongoose.model("Asset", assetSchema);

module.exports = Assets;
