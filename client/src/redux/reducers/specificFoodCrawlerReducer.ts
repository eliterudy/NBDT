import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { getSpecificFoodCrawler } from "../../apis/api";
import { foodCrawler } from "../../config/types";

interface SpecificFoodCrawlerState {
  specificFoodCrawler: foodCrawler;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SpecificFoodCrawlerState = {
  specificFoodCrawler: <foodCrawler>{},
  status: "idle",
  error: null,
};

const specificFoodCrawlerSlice = createSlice({
  name: "specificFoodCrawler",
  initialState,
  reducers: {
    getSpecificFoodCrawlerStart(state) {
      state.status = "loading";
    },
    getSpecificFoodCrawlerSuccess(state, action: PayloadAction<foodCrawler>) {
      state.status = "succeeded";
      state.specificFoodCrawler = action.payload;
      state.error = null;
    },
    getSpecificFoodCrawlerFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getSpecificFoodCrawlerStart,
  getSpecificFoodCrawlerSuccess,
  getSpecificFoodCrawlerFailure,
} = specificFoodCrawlerSlice.actions;

export default specificFoodCrawlerSlice.reducer;

export const fetchSpecificFoodCrawler =
  (id: any) => async (dispatch: Dispatch) => {
    try {
      dispatch(getSpecificFoodCrawlerStart());
      const response = await getSpecificFoodCrawler(id);
      dispatch(getSpecificFoodCrawlerSuccess(response));
    } catch (error) {
      dispatch(getSpecificFoodCrawlerFailure(error.message));
    }
  };
