import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { getFoodCrawlers } from "../../apis/api";
import { FoodCrawler } from "../../config/types";

interface foodCrawlerResponse {
  count: number;
  results: FoodCrawler[];
}

interface FoodCrawlerState {
  foodCrawlers: foodCrawlerResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FoodCrawlerState = {
  foodCrawlers: { count: 0, results: [] },
  status: "idle",
  error: null,
};

const foodCrawlerSlice = createSlice({
  name: "foodCrawlers",
  initialState,
  reducers: {
    getFoodCrawlersStart(state) {
      state.status = "loading";
    },
    getFoodCrawlersSuccess(state, action: PayloadAction<foodCrawlerResponse>) {
      state.status = "succeeded";
      state.foodCrawlers = action.payload;
      state.error = null;
    },
    getFoodCrawlersFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getFoodCrawlersStart,
  getFoodCrawlersSuccess,
  getFoodCrawlersFailure,
} = foodCrawlerSlice.actions;

export default foodCrawlerSlice.reducer;

export const fetchFoodCrawlers = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getFoodCrawlersStart());
    const response = await getFoodCrawlers();
    dispatch(getFoodCrawlersSuccess(response));
  } catch (error) {
    dispatch(getFoodCrawlersFailure(error.message));
  }
};
