import { IResponse } from '../../IResponse';
import { ApiProperty } from '@nestjs/swagger';

export class OpenOTPReponse implements IResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'open OTP success' })
  message: string;

  @ApiProperty({
    example: {
      image: '',
      urlOTP: '',
    },
    nullable: true,
  })
  data: {
    image: string;
    urlOTP: string;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
