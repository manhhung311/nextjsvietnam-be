import { IResponse } from '../../IResponse';
import { ApiProperty } from '@nestjs/swagger';

export class ReactivatedReponse implements IResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'user login success' })
  message: string;

  @ApiProperty({
    example: {
      email: 'xxx@gmail.com',
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
