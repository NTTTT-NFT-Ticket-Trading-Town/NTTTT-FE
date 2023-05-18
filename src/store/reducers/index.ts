import { combineReducers } from "redux";

// import reducers
import user, { userApi } from "./user";
import artist, { artistsApi } from "./artist";
import { gachaApi } from "./gacha";
import { paymentApi } from "./payment";

const rootReducer = combineReducers({
  user: user,
  artist: artist,
  [userApi.reducerPath]: userApi.reducer,
  [artistsApi.reducerPath]: artistsApi.reducer,
  [gachaApi.reducerPath]: gachaApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
});

export default rootReducer;
