import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDTO {
  @ApiProperty({
    example: 'manhhung311',
    description: 'ten tai khoan dang nhap',
    maxLength: 255,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'M123456789',
    description: 'mat khau nguoi dung',
    minLength: 8,
    maxLength: 16,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiProperty({
    example: 'a@gmail.com',
    description: 'email nguoi dung',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  link: string;
}
