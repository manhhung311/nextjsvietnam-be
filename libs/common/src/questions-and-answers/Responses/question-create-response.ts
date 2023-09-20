import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '@app/common/IResponse';

export class QuestionCreateResponse implements IResponse {
  @ApiProperty({
    example: 200,
    description: 'status code',
  })
  statusCode: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({
    example: {
      data: {
        id: '2341211',
        data: 'bug',
        categoryId: 123,
        userId: 'hello',
        createAt: new Date(),
        updateAt: new Date(),
      },
    },
    nullable: true,
  })
  data: { id: string; data: string; categoryId: number; userId: string; createdAt: Date; updateAt: Date };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
