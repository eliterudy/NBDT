const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var foodCrawlerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    poster_url: {
      type: String,
      default: "",
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
