import { createSlice } from "@reduxjs/toolkit";

import { GotchaStateInterface } from "./gotchaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const gotchaEndpoint = "gotcha.json";

const initialState: GotchaStateInterface = {
  refresh_count: 0, // current gatcha index
  gatcha_list: [],
};

const gotcha = createSlice({
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

export default gotcha.reducer;
// export const {  } = user.actions;

// APIs

export const gotchaApi = createApi({
  reducerPath: "gotchaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  endpoints: (builder) => ({
    getGotcha: builder.query<GotchaStateInterface, string>({
      // FIXME: temporary fake url
      query: (search) => search || gotchaEndpoint,
    }),
  }),
});

export const { useGetGotchaQuery } = gotchaApi;
