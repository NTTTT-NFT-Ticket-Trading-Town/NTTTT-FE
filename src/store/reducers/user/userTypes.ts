export interface UserState {
  session: string; // you can get session value from server when you succeedd login.
}
export type RoleType = string;

export interface UserDetailInterface {
  id: number;
  wallet_addr: string;
  nickname: string;
  password: string;
  phone_number: string;
  authorities: RoleType[];
  grantedAuthority: any[];
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
