import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./userTypes";

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
