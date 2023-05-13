export interface ArtistStateInterface {
  searchActive: boolean;
  search: SearchType;
  artists: ArtistInterface[];
}

export interface ArtistInterface {
  id: ArtistIDType;
  name: string;
  image_url: string;
}

export type SearchType = string;
export type ArtistIDType = number;
