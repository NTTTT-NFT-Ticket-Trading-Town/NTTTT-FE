import { combineReducers } from "redux";

// import reducers
import user from "./user";
import { artistsApi } from "./artist";

const rootReducer = combineReducers({
  user: user,
  [artistsApi.reducerPath]: artistsApi.reducer,
});

export default rootReducer;
