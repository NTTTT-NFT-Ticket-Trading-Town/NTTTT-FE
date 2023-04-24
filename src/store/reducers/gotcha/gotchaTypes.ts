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

export interface GatchaInterface {
  event: EventInfoInterface;
  artist: string;
  price: PriceInterface;
  image_url: string;
  watchers: number;
  description: string;
  token_id: string; // maybe number
}

export interface GotchaStateInterface {
  refresh_count: number;
  gatcha_list: GatchaInterface[];
}
