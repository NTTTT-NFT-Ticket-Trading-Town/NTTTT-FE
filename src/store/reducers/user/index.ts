import { createSlice } from "@reduxjs/toolkit";

import { UserInterface, UserState } from "./userTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState: UserState = {
  session: "",
};

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      const session = action.payload;
      state.session = session;
    },
    logoutUser(state) {
      state.session = "";
    },
  },
});

export default user.reducer;
export const { loginUser, logoutUser } = user.actions;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<string, UserInterface>({
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
