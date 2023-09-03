import { IResponse } from '../../IResponse';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../DTO/IUser.interface';

export class VerifyOTPResponse implements IResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    example: {
      image: '',
      urlOTP: '',
    },
    nullable: true,
  })
  data: {
    user: IUser;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
