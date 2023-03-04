const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var foodCrawlerSchema = new Schema(
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
    price_range: {
      type: Number,
      required: 0,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

var FoodCrawlers = mongoose.model("FoodCrawler", foodCrawlerSchema);

module.exports = FoodCrawlers;
