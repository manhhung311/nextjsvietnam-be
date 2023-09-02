import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  link: string;
}
