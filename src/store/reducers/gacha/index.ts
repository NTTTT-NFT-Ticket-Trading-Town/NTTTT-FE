import { createSlice } from "@reduxjs/toolkit";

import { GachaStateInterface } from "./gachaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const gachaEndpoint = "gacha.json";

const initialState: GachaStateInterface = {
  refresh_count: 0, // current gacha index
  gacha_list: [],
};

const gacha = createSlice({
  name: "gacha",
  initialState: initialState,
  reducers: {
    setGachaStateFromDTO: (state, action) => {
      const { refresh_count, gacha_list } = action.payload;
      state.refresh_count = refresh_count;
      state.gacha_list = gacha_list;
    },
  },
});

export default gacha.reducer;
// export const {  } = user.actions;

// APIs

export const gachaApi = createApi({
  reducerPath: "gachaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  endpoints: (builder) => ({
    getGacha: builder.query<GachaStateInterface, string>({
      // FIXME: temporary fake url
      query: (search) => search || gachaEndpoint,
    }),
  }),
});

export const { useGetGachaQuery } = gachaApi;
