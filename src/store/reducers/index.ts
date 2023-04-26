import { combineReducers } from "redux";

// import reducers
import user from "./user";
import { artistsApi } from "./artist";
import { gotchaApi } from "./gotcha";

const rootReducer = combineReducers({
  user: user,
  [artistsApi.reducerPath]: artistsApi.reducer,
  [gotchaApi.reducerPath]: gotchaApi.reducer,
});

export default rootReducer;
