export interface PaymentState {
  option: OptionType;
  phone: PhoneType;
  wallet: WalletType;
  agree: AgreeType;
  valid: ValidType;
}

export type OptionType = "card" | "eth";
export type PhoneType = string;
export type WalletType = string;
export type AgreeType = boolean;
export type ValidType = boolean;
