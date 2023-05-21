/**
 * REMIND:
 * 1. (GET) state 값을 가져오고 싶다면, useReduxSelector를 Wrapping한 useSelector를 import 하여 사용한다.
 * examples:
 * import {useSelector} from "store"
 * export default function Component() {
 *    const {session} = useSelector(state => state.user);
 * }
 * 2. (SET) state 값을 변경하고 싶다면, useAppDispatch를 Wrapping한 useDispatch를 import 하여 사용한다.
 * examples:
 * import {useDispatch} from "store"
 * export default function Component(){
 *    const dispatch = useDispatch();
 *    const handleOnClick = () => {
 *      requestLogin(userInfo)
 *        .then(res => dispatch({type: 'user/login', payload: {session: "1541"}}))
 *    }
 * }
 *
 */

import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useAppDispatch,
} from "react-redux";

import rootReducers from "./reducers";

import { artistsApi } from "./reducers/artist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gachaApi } from "./reducers/gacha";
import { userApi } from "./reducers/user";
import { paymentApi } from "./reducers/payment";
import { mypageApi } from "./reducers/mypage";

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      artistsApi.middleware,
      gachaApi.middleware,
      paymentApi.middleware,
      mypageApi.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector; // Type Inference를 위해 useReduxSelector로 useSelector를 만들어준다.
const useDispatch = () => useAppDispatch<AppDispatch>(); // Type Inference를 위해 useAppDispatch로 dispatch함수를 만들어준다.

const { dispatch } = store;

setupListeners(dispatch);

export { store, dispatch, useSelector, useDispatch };
