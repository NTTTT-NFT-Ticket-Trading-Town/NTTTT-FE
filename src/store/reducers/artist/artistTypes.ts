export interface ArtistStateInterface {
  searchActive: boolean;
  search: SearchType;
  artists: ArtistInterface[];
  groups: string[];
}

export interface GroupInterface {
  group: string;
  members: ArtistInterface[];
}

export interface ArtistInterface {
  id: ArtistIDType;
  group: string;
  name: string;
  img_url: string;
}

export interface FavoriteArtistInterface {
  artistId: number;
}

export type SearchType = string;
export type ArtistIDType = number;
