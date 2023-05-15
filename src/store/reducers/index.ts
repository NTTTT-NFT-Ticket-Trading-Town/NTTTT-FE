import { combineReducers } from "redux";

// import reducers
import user from "./user";
import artist, { artistsApi } from "./artist";
import { gachaApi } from "./gacha";

const rootReducer = combineReducers({
  user: user,
  artist: artist,
  [artistsApi.reducerPath]: artistsApi.reducer,
  [gachaApi.reducerPath]: gachaApi.reducer,
});

export default rootReducer;
