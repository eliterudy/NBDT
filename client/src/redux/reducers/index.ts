import { combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantReducer";
import foodCrawlerReducer from "./foodCrawlerReducer";
import specificRestaurantReducer from "./specificRestaurantReducer";
import specificFoodCrawlerReducer from "./specificFoodCrawlerReducer";

// import any other reducers here

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  foodCrawler: foodCrawlerReducer,
  specificRestaurant: specificRestaurantReducer,
  specificFoodCrawler: specificFoodCrawlerReducer,
  // add any other reducers here
});

export default rootReducer;
