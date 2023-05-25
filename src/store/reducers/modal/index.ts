import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalStateInterface } from "./modalTypes";

const initialState: ModalStateInterface = {
  showModal: false,
  hp: 0,
  message: "",
};

const TO_SECONDS: number = 1000;

const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<Omit<ModalStateInterface, "showModal">>
    ) => {
      const { hp, message } = action.payload;
      state.showModal = true;
      setTimeout(() => {
        state.showModal = false;
      }, hp * TO_SECONDS);
      state.message = message;
    },
  },
});

export default modal.reducer;
