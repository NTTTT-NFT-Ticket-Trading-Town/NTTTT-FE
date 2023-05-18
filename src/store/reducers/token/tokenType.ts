import { ArtistInterface } from "../artist/artistTypes";
import { EventInfoInterface, ImageInterface } from "../gacha/gachaTypes";

export interface TokenInterface {
  event: EventInfoInterface;
  id: number;
  image: ImageInterface;
  artist: ArtistInterface;
  seq: number;
  price: number;
  desc: string;
  nft_id: number;
  owner: string;
}
