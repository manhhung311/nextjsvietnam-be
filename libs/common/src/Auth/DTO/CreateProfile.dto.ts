import { IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateProfile {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  avatar: File;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  idUser: number;
}
