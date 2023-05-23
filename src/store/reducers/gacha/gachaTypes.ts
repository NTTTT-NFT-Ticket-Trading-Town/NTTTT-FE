import { ArtistInterface } from "../artist/artistTypes";

export interface PriceInterface {
  amount: number;
}

export interface EventInfoInterface {
  id: number;
  name: string;
  publisher: string;
  quantity: number;
  description: string;
}

export interface GachaInterface {
  id: number;
  seq: number; // gacha index
  event: EventInfoInterface;
  artist: ArtistInterface;
  price: number;
  image: ImageInterface;
  watchers: number;
  desc: string;
  paymentState: string;
  publishedAt: string;
}

export interface ImageInterface {
  url: string;
  ratio: string;
}

export interface GachaStateInterface {
  chance: number;
  token: GachaInterface | null;
}
