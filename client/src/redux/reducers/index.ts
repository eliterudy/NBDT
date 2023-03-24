import { combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantReducer";
// import any other reducers here

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  // add any other reducers here
});

export default rootReducer;
