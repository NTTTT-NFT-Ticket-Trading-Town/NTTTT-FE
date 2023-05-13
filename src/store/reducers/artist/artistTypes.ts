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
  image_url: string;
}

export type SearchType = string;
export type ArtistIDType = number;
