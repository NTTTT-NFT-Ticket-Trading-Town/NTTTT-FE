import { createSlice } from "@reduxjs/toolkit";

import { GotchaStateInterface } from "./gotchaTypes";

const initialState: GotchaStateInterface = {
  refresh_count: 0, // current gatcha index
  gatcha_list: [],
};

const user = createSlice({
  name: "gotcha",
  initialState: initialState,
  reducers: {
    setGotchaStateFromDTO: (state, action) => {
      const { refresh_count, gatcha_list } = action.payload;
      state.refresh_count = refresh_count;
      state.gatcha_list = gatcha_list;
    },
  },
});

export default user.reducer;
// export const {  } = user.actions;
