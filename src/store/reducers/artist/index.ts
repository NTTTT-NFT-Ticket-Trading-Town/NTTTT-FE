import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  ArtistInterface,
  ArtistStateInterface,
  GroupInterface,
  SearchType,
} from "./artistTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ServerResponseInterface } from "../indexTypes";

const initialState: ArtistStateInterface = {
  searchActive: false,
  search: "",
  artists: [],
  groups: [],
};

const searchArtists = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    toggleSearchActive(state) {
      state.searchActive = !state.searchActive;
    },
    setSearch(state, action: PayloadAction<SearchType>) {
      state.search = action.payload;
    },
    toggleFavoriteGroups(state, action: PayloadAction<string>) {
      const group = action.payload;
      const hasGroup = state.groups.find((item) => item === group);

      if (hasGroup)
        state.groups = state.groups.filter((item) => item !== group);
      else state.groups = [...state.groups, group];
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
export const {
  toggleSearchActive,
  setSearch,
  toggleFavoriteArtist,
  toggleFavoriteGroups,
} = searchArtists.actions;

export const artistsApi = createApi({
  reducerPath: "artistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/artist",
  }),
  endpoints: (builder) => ({
    getAllArtists: builder.query<
      ServerResponseInterface<GroupInterface[]>,
      void
    >({
      query: () => `/all`,
    }),
    getMatchingArtists: builder.query<
      ServerResponseInterface<GroupInterface[]>,
      SearchType
    >({
      query: (search) => `/${search}`,
    }),
  }),
});

export const { useGetAllArtistsQuery, useGetMatchingArtistsQuery } = artistsApi;
