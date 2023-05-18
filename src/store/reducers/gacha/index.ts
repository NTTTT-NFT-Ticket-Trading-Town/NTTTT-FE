import { createSlice } from "@reduxjs/toolkit";
import { GachaInterface, GachaStateInterface } from "./gachaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ServerResponseInterface } from "../indexTypes";

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
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.session;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postDailyGacha: builder.mutation<
      ServerResponseInterface<GachaStateInterface>,
      void
    >({
      query() {
        return {
          url: "",
          method: "POST",
        };
      },
      transformErrorResponse: (error) => {
        console.log(error.data);
        return error.data;
      },
    }),
    getDailyGacha: builder.query<ServerResponseInterface<GachaInterface>, void>(
      {
        query() {
          return {
            url: "",
            method: "GET",
          };
        },
      }
    ),
  }),
});

export const { usePostDailyGachaMutation, useGetDailyGachaQuery } = gachaApi;
