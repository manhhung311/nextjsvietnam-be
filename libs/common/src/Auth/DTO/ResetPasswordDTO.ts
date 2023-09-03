import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}
