import { createSlice } from "@reduxjs/toolkit";

import { ResponseInterface, UserInterface, UserState } from "./userTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getLocalStorageSession = () => {
  return localStorage.getItem("ntttt-user-session");
};
const setLocalStorageSession = (session: string) => {
  localStorage.setItem("ntttt-user-session", session);
};

const initialState: UserState = {
  session: getLocalStorageSession() || "",
};

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.session = action.payload;
      setLocalStorageSession(action.payload);
    },
    logout(state) {
      state.session = "";
      setLocalStorageSession("");
    },
  },
});

export default user.reducer;
export const { setToken, logout } = user.actions;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ResponseInterface<UserInterface>, UserInterface>({
      query(userData) {
        return {
          url: "/login",
          method: "POST",
          body: { ...userData },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = userApi;
