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
  image: GatchaImageInterface;
  watchers: number;
  description: string;
  token_id: string; // maybe number
}

interface GatchaImageInterface {
  url: string;
  ratio: string;
}

export interface GotchaStateInterface {
  refresh_count: number;
  gatcha_list: GatchaInterface[];
}
