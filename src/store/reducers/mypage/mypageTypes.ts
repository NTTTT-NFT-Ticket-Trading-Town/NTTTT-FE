import { GatchaInterface } from "../gotcha/gotchaTypes";

export interface MypageStateInterface {
  category_list: CategoryType[];
  gatcha_list: GatchaInterface[];
}

type CategoryType = "string";
