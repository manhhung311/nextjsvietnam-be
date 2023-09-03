export interface IUser {
  id: any;
  username: string;
  email: string;
  token?: object;
  otp?: boolean;
  profile?: object;
  verifyOTP?: boolean;
}
