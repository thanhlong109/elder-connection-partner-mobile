import { Role } from '~/enums';

export interface Credentials {
  username: string;
  password: string;
}

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  biography: any;
  profilePicture: any;
  birthday: string;
  sex: number;
  status: number;
  walletBalance: string;
  createAt: string;
  accountPhone: string;
  accountEmail: string;
  birthDate: string;
  accountPassword: string;
  confirmAccountPassword: string;
  jwtToken: string;
  expired: string;
  jwtRefreshToken: string;
  cccdNumber: string;
}

export type SignUpRequest = Pick<
  Account,
  | 'accountPhone'
  | 'firstName'
  | 'lastName'
  | 'accountEmail'
  | 'accountPassword'
  | 'confirmAccountPassword'
  | 'cccdNumber'
>;

export type SignUpRespone = Pick<
  Account,
  | 'accountPhone'
  | 'firstName'
  | 'lastName'
  | 'sex'
  | 'accountEmail'
  | 'birthDate'
  | 'accountPassword'
  | 'confirmAccountPassword'
>;

export type SignInRequest = Pick<Account, 'accountEmail' | 'accountPassword'>;

export interface SignInRespone {
  jwtToken: string;
  expired: string;
  jwtRefreshToken: string;
  accountId: string;
}

export interface AccountDestailsRespones {
  id: string;
  firstName: string;
  lastName: string;
  biography: string;
  accountEmail: string;
  accountPhone: string;
  profilePicture: string;
  birthday: string;
  sex: number;
  status: number;
  walletBalance: string;
  createAt: string;
  cccdNumber: string;
  avgRating: any;
}

export type UpdateAccountRequest = Pick<
  Account,
  'id' | 'firstName' | 'lastName' | 'sex' | 'biography' | 'profilePicture' | 'birthday'
>;

export type GetWalletBalanceResponse = Pick<
  Account,
  'firstName' | 'lastName' | 'profilePicture'
> & {
  walletBalance: number;
};

export interface JwtDecoded {
  aud: string;
  exp: number;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': Role;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  iss: string;
  jti: string;
}
