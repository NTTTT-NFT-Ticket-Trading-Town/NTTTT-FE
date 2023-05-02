type PriceType = "ethereum" | "won";
export interface PriceInterface {
  type: PriceType;
  amount: number;
}

export interface EventInfoInterface {
  title: string;
  publisher: string;
  total_token: number;
}

export interface GachaInterface {
  event: EventInfoInterface;
  artist: string;
  price: PriceInterface;
  image: GachaImageInterface;
  watchers: number;
  description: string;
  token_id: string; // maybe number
}

interface GachaImageInterface {
  url: string;
  ratio: string;
}

export interface GachaStateInterface {
  refresh_count: number;
  gacha_list: GachaInterface[];
}
