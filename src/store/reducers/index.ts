import { combineReducers } from "redux";

// import reducers
import artist, { artistsApi } from "./artist";
import { gachaApi } from "./gacha";
import { mypageApi } from "./mypage";
import { paymentApi } from "./payment";
import user, { userApi } from "./user";

const rootReducer = combineReducers({
  user: user,
  artist: artist,
  [userApi.reducerPath]: userApi.reducer,
  [artistsApi.reducerPath]: artistsApi.reducer,
  [gachaApi.reducerPath]: gachaApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [mypageApi.reducerPath]: mypageApi.reducer,
});

export default rootReducer;
