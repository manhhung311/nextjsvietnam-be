import { IUser } from '@app/common/Auth/DTO/IUser.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '@app/common/IResponse';

export class RegisterReponse implements IResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'user login success' })
  message: string;

  @ApiProperty({
    example: {
      user: {
        email: '',
        id: '',
      },
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
