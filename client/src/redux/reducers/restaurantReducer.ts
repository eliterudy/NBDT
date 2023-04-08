import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { getRestaurants } from "../../apis/api";
import { Restaurant } from "../../config/types";

interface RestaurantResponse {
  count: number;
  results: Restaurant[];
}

interface RestaurantState {
  restaurants: RestaurantResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: { count: 0, results: [] },
  status: "idle",
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    getRestaurantsStart(state) {
      state.status = "loading";
    },
    getRestaurantsSuccess(state, action: PayloadAction<RestaurantResponse>) {
      state.status = "succeeded";
      state.restaurants = action.payload;
      state.error = null;
    },
    getRestaurantsFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getRestaurantsStart,
  getRestaurantsSuccess,
  getRestaurantsFailure,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;

export const fetchRestaurants = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getRestaurantsStart());
    const response = await getRestaurants();
    dispatch(getRestaurantsSuccess(response));
  } catch (error) {
    dispatch(getRestaurantsFailure(error.message));
  }
};
