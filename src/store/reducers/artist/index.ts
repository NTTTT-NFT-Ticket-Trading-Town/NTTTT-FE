import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ArtistState, SearchType } from "./artistTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const BACKEND_URL = "";
const searchArguments = "/";

const initialState: SearchType = "";

const searchArtists = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearch(_, action: PayloadAction<SearchType>) {
      return action.payload;
    },
  },
});

export default searchArtists.reducer;
export const { setSearch } = searchArtists.actions;

export const artistsApi = createApi({
  reducerPath: "artistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  endpoints: (builder) => ({
    getMatchingArtists: builder.query<ArtistState[], SearchType>({
      query: (search) => searchArguments + search,
    }),
  }),
});

export const { useGetMatchingArtistsQuery } = artistsApi;
