import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { getSpecificRestaurant } from "../../apis/api";
import { restaurant } from "../../config/types";

interface SpecificRestaurantState {
  specificRestaurant: restaurant;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SpecificRestaurantState = {
  specificRestaurant: <restaurant>{},
  status: "idle",
  error: null,
};

const specificRestaurantsSlice = createSlice({
  name: "specificRestaurant",
  initialState,
  reducers: {
    getSpecificRestaurantStart(state) {
      state.status = "loading";
    },
    getSpecificRestaurantSuccess(state, action: PayloadAction<restaurant>) {
      state.status = "succeeded";
      state.specificRestaurant = action.payload;
      state.error = null;
    },
    getSpecificRestaurantFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    setSpecificRestaurant(state, action: PayloadAction<restaurant>) {
      state.specificRestaurant = action.payload;
    },
  },
});

export const {
  getSpecificRestaurantStart,
  getSpecificRestaurantSuccess,
  getSpecificRestaurantFailure,
} = specificRestaurantsSlice.actions;

export default specificRestaurantsSlice.reducer;

export const fetchSpecificRestaurants =
  (id: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(getSpecificRestaurantStart());
      const response = await getSpecificRestaurant(id);
      dispatch(getSpecificRestaurantSuccess(response));
    } catch (error) {
      dispatch(getSpecificRestaurantFailure(error.message));
    }
  };
