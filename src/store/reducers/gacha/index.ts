import { createSlice } from "@reduxjs/toolkit";
import { GachaInterface, GachaStateInterface } from "./gachaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const initialState: GachaStateInterface = {
  refresh_count: 0, // current gacha index
  gacha: null,
};

const gacha = createSlice({
  name: "gacha",
  initialState: initialState,
  reducers: {
    setGachaStateFromDTO: (state, action) => {
      const { refresh_count, gacha } = action.payload;
      state.refresh_count = refresh_count;
      state.gacha = gacha;
    },
  },
});

export default gacha.reducer;

// APIs

export const gachaApi = createApi({
  reducerPath: "gachaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/gacha",
  }),
  endpoints: (builder) => ({
    getDailyGacha: builder.mutation<GachaStateInterface, void>({
      query() {
        return {
          url: "",
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetDailyGachaMutation } = gachaApi;
