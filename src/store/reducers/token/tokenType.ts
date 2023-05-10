import { ImagePropsInterface } from "../../../components/Image/ImageTypes";
import { ArtistState } from "../artist/artistTypes";
import { EventInfoInterface, PriceInterface } from "../gacha/gachaTypes";

export interface TokenInterface {
  event: EventInfoInterface;
  id: number;
  image: ImagePropsInterface;
  artist: ArtistState;
  seq: number;
  price: PriceInterface;
  desc: string;
  nft_id: number;
  owner: string;
}
