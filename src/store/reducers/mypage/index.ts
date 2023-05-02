import { createSlice } from "@reduxjs/toolkit";
import { MypageStateInterface } from "./mypageTypes";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GachaInterface } from "../gacha/gachaTypes";

const initialState: MypageStateInterface = {
  category_list: [], // filter gacha_list by category_list
  gacha_list: [],
};

const mypage = createSlice({
  name: "mypage",
  initialState: initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload;
      const hasCategory = state.category_list.includes(category);
      if (hasCategory) {
        state.category_list = state.category_list.filter(
          (item) => item !== category
        );
      } else {
        state.category_list.push(category);
      }
    },
  },
});

export default mypage.reducer;
export const { toggleCategory } = mypage.actions;

// APIs
export const mypageApi = createApi({
  reducerPath: "mypageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getMyCollection: builder.query<GachaInterface[], void>({
      query: () => "collection",
    }),
  }),
});

export const { useGetMyCollectionQuery } = mypageApi;
