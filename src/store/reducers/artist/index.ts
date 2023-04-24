import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ArtistState, SearchType } from "./artistTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = "localhost:8000";
const searchArguments = "/artists?search=";

const initialState: SearchType = "";

const searchArtists = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SearchType>) {
      return action.payload;
    },
  },
});

export default searchArtists.reducer;
export const { setSearch } = searchArtists.actions;

export const artistsApi = createApi({
  reducerPath: "artistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
  }),
  endpoints: (builder) => ({
    getMatchingArtists: builder.query<ArtistState[], SearchType>({
      query: (search) => searchArguments + search,
    }),
  }),
});

export const { useGetMatchingArtistsQuery } = artistsApi;
