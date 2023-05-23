import { GachaInterface } from "../gacha/gachaTypes";

export interface MypageStateInterface {
  category_list: CategoryType[];
  gacha_list: GachaInterface[];
}

type CategoryType = {
  name: string;
  group: string;
};
