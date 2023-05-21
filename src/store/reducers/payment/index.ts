import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  PaymentState,
  AgreeType,
  OptionType,
  PhoneType,
  WalletType,
} from "./paymentTypes";
import { WritableDraft } from "immer/dist/internal.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenInterface } from "../token/tokenType";
import { ServerResponseInterface } from "../indexTypes";

const initialState: PaymentState = {
  option: "card",
  phone: "",
  wallet: "",
  agree: false,
  valid: false,
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setOption(state, action: PayloadAction<OptionType>) {
      state.option = action.payload;
    },
    setPhone(state, action: PayloadAction<PhoneType>) {
      state.phone = action.payload;
    },
    setWallet(state, action: PayloadAction<WalletType>) {
      state.wallet = action.payload;
    },
    setAgree(state, action: PayloadAction<AgreeType>) {
      state.agree = action.payload;
    },
    validate(state) {
      const isValid = validation(state);

      if (isValid) state.valid = true;
      else state.valid = false;
    },
  },
});

function validation(state: WritableDraft<PaymentState>): boolean {
  const { option, phone, wallet, agree } = state;

  if (!agree) return false;
  if (phoneChecker(phone)) return false;

  if (option === "card") {
    if (wallet.length === 16) return true;
  } else if (option === "eth") {
    if (wallet.length === 42) return true;
  }

  return false;
}

function phoneChecker(phone: string): boolean {
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

  if (phoneRegex.test(phone)) return true;
  else return false;
}

export const { setOption, setPhone, setWallet, setAgree } = payment.actions;

export default payment.reducer;

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/payment",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.session;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getToken: builder.query<ServerResponseInterface<TokenInterface>, number>({
      query(id) {
        return {
          url: "/token/" + id,
          method: "GET",
        };
      },
    }),
    postPayment: builder.mutation<
      ServerResponseInterface<PaymentState>,
      number
    >({
      query(id) {
        return {
          url: "",
          method: "POST",
          body: {
            tokenId: id,
          },
        };
      },
    }),
  }),
});

export const { useGetTokenQuery, usePostPaymentMutation } = paymentApi;
