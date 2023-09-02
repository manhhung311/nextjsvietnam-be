import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '@app/common/IResponse';

export class ResetPasswordResponse implements IResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    example: {
      email: 'xxx.@gmail.com',
    },
    nullable: true,
  })
  data: {
    email: string;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
