import { ArtistState } from "./artistTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ArtistState[] = [];

const favoriteArtists = createSlice({
  name: "artist",
  initialState: initialState,
  reducers: {
    toggleFavoriteArtist(state, action: PayloadAction<ArtistState>) {
      const artist = action.payload;
      const hasArtist = state.find((item) => item.id === artist.id);

      if (hasArtist) {
        return state.filter((item) => item.id !== artist.id);
      } else {
        return [...state, artist];
      }
    },
  },
});

export default favoriteArtists.reducer;
export const { toggleFavoriteArtist } = favoriteArtists.actions;
