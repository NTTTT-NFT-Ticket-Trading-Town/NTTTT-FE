import { ArtistInterface, ArtistStateInterface } from "../artist/artistTypes";

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
  price: PriceInterface;
  image: GachaImageInterface;
  watchers: number;
  description: string;
  paymentState: string;
  publishedAt: string;
}

interface GachaImageInterface {
  url: string;
  ratio: string;
}

export interface GachaStateInterface {
  refresh_count: number;
  gacha: GachaInterface | null;
}
