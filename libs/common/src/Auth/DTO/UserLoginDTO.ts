import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({
    example: 'username@gmail.com',
    description: 'email hoac ten dang nhap',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'M123456789',
    description: 'mat khau nguoi dung - mat khau lon hon 8 ky tu',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
