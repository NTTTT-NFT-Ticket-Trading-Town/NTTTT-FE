export interface UserState {
  session: string; // you can get session value from server when you succeedd login.
}

export interface UserInterface {
  nickname: string;
  password: string;
}

export interface SignupInterface {
  walletAddr: string;
  nickname: string;
  phoneNumber: string;
  password: string;
}
