import { createSlice } from "@reduxjs/toolkit";
import { GachaInterface, GachaStateInterface } from "./gachaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ServerResponseInterface } from "../indexTypes";

const initialState: GachaStateInterface = {
  chance: 0, // current gacha index
  token: null,
};

const gacha = createSlice({
  name: "gacha",
  initialState: initialState,
  reducers: {
    setGachaStateFromDTO: (state, action) => {
      const { chance, token } = action.payload;
      state.chance = chance;
      state.token = token;
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
  tagTypes: ["Gacha"],
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
      invalidatesTags: ["Gacha"],
    }),
    getDailyGacha: builder.query<
      ServerResponseInterface<GachaStateInterface>,
      void
    >({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },
      providesTags: ["Gacha"],
    }),
  }),
});

export const { usePostDailyGachaMutation, useGetDailyGachaQuery } = gachaApi;
