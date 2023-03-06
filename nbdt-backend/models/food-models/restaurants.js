const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var restaurantSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      // unique: true,
    },
    image_urls: {
      poster: {
        type: String,
        default: "",
      },
      logo: {
        type: String,
        default: "",
      },
      banner: {
        type: String,
        default: "",
      },
    },
    price_range: {
      type: Number,
      // required: true,
    },
    rating: {
      type: Number,
      // required: true,
    },
    category: [
      {
        type: String,
        default: "",
      },
    ],
    crawlers: [
      {
        crawl_id: {
          type: String,
          default: "",
        },
        meal_type: {
          type: String,
          default: "",
        },
      },
    ],
    alternate_category: [
      {
        type: String,
        default: "",
      },
    ],
    address: {
      type: String,
      default: "",
      // required: true,
    },
    country_code: {
      type: String,
      default: "",
      // required: true,
    },
    phone: {
      type: String,
      default: "",
      // required: true,
    },
    schedule: [
      {
        type: String,
        default: "",
      },
    ],
    website_url: {
      type: String,
      // required: true,
    },
    spice_level: {
      type: Number,
      // required: true,
    },
    menu_url: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      default: "",
    },
    coordinates: {
      latitude: {
        type: String,
        default: "",
        // required: true,
      },
      longitude: {
        type: String,
        default: "",
        // required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

var Restaurants = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurants;
