import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  ArtistInterface,
  ArtistStateInterface,
  SearchType,
} from "./artistTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const BACKEND_URL = "";
const searchArguments = "/";

const initialState: ArtistStateInterface = {
  search: "",
  artists: [],
};

const searchArtists = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SearchType>) {
      state.search = action.payload;
    },
    toggleFavoriteArtist(state, action: PayloadAction<ArtistInterface>) {
      const artist = action.payload;
      const hasArtist = state.artists.find((item) => item.id === artist.id);

      if (hasArtist) {
        state.artists = state.artists.filter((item) => item.id !== artist.id);
      } else {
        state.artists = [...state.artists, artist];
      }
    },
  },
});

export default searchArtists.reducer;
export const { setSearch, toggleFavoriteArtist } = searchArtists.actions;

export const artistsApi = createApi({
  reducerPath: "artistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  endpoints: (builder) => ({
    getMatchingArtists: builder.query<ArtistInterface[], SearchType>({
      query: (search) => searchArguments + search,
    }),
  }),
});

export const { useGetMatchingArtistsQuery } = artistsApi;
