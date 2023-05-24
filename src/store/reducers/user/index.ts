import { createSlice } from "@reduxjs/toolkit";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignupInterface,
  UserDetailInterface,
  UserInterface,
  UserState,
} from "./userTypes";
import { ServerResponseInterface } from "../indexTypes";
import { FavoriteArtistInterface } from "../artist/artistTypes";

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
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.session;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    detail: builder.query<ServerResponseInterface<UserDetailInterface>, void>({
      query: () => `/detail`,
      forceRefetch: () => true,
    }),
    login: builder.mutation<
      ServerResponseInterface<UserInterface>,
      UserInterface
    >({
      query(userData) {
        return {
          url: "/login",
          method: "POST",
          body: { ...userData },
        };
      },
    }),
    postFavoriteArtists: builder.mutation<
      ServerResponseInterface<any>, // ResponseType
      FavoriteArtistInterface[] // QueryArg
    >({
      query(body) {
        return {
          url: "/artist",
          method: "POST",
          body: body,
        };
      },
      transformErrorResponse: (error) => {
        console.log(error.data);
        return error.data;
      },
    }),
    signup: builder.mutation<
      ServerResponseInterface<UserInterface>,
      SignupInterface
    >({
      query(userData) {
        return {
          url: "/join",
          method: "POST",
          body: { ...userData },
        };
      },
    }),
  }),
});

export const {
  useDetailQuery,
  useSignupMutation,
  usePostFavoriteArtistsMutation,
  useLoginMutation,
} = userApi;
