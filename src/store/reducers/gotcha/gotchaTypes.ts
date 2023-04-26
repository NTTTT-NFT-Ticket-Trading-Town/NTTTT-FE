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

const fakeGotcha: GotchaStateInterface = {
  refresh_count: 0,
  gatcha_list: [
    {
      event: {
        title: "SM LIVE 2022 in SEOUL",
        publisher: "SM ENTERTAINMENT",
        total_token: 100,
      },
      artist: "AESPA - Winter",
      price: {
        type: "ethereum",
        amount: 0.1,
      },
      image_url:
        "https://kpopping.com/documents/50/1/1821/220829-Aespa-Winter-at-Smtown-live-2022-documents-3.jpeg?v=adaf2",
      watchers: 10,
      description: "test",
      token_id: "1",
    },
    {
      event: {
        title: "SM LIVE 2022 in SEOUL",
        publisher: "SM ENTERTAINMENT",
        total_token: 100,
      },
      artist: "AESPA - Karina",
      price: {
        type: "ethereum",
        amount: 0.1,
      },
      image_url:
        "https://kpopping.com/documents/f1/4/2048/220827-aespa-Karina-SMTOWN-in-JAPAN-documents-5.jpeg?v=c8dfd",
      watchers: 10,
      description: "test",
      token_id: "2",
    },
  ],
};
