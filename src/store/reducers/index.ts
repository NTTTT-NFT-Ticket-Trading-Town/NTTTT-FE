import { combineReducers } from "redux";

// import reducers
import user from "./user";

const rootReducer = combineReducers({
  user: user,
});

export default rootReducer;
