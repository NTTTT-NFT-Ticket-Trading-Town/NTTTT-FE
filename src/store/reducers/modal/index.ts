import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ModalPayload, ModalStateInterface } from "./modalTypes";
import { dispatch } from "../..";

const initialState: ModalStateInterface = {
  showModal: false,
  hp: 0,
  message: "",
};

/**
 * 사용법
 * 1. import { setModal } from "..."
 * 2. eventHandler에 적용
 * setModal({hp: 10, message: "사랑해요"}); // 사랑해요 모달 10초동안 오픈.
 */

const TO_SECONDS = 1000;

const setModalAsync = createAsyncThunk(
  "modal/setModalAction",
  async (payload: ModalPayload, { dispatch }) => {
    const { hp, message } = payload;
    dispatch(setModalMessage(message));
    dispatch(setModalShowing(true));

    await new Promise((resolve) => setTimeout(resolve, hp * TO_SECONDS));

    dispatch(setModalMessage(""));
    dispatch(setModalShowing(false));
  }
);

const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModalShowing: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setModalMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setModalAsync.fulfilled, (state) => {
  //     // 비동기 작업이 완료된 후 수행할 작업이 있다면 여기에 추가
  //   });
  // },
});

export const { setModalShowing, setModalMessage } = modal.actions;
export default modal.reducer;

export const setModal = (payload: ModalPayload) => {
  dispatch(setModalAsync(payload));
};
