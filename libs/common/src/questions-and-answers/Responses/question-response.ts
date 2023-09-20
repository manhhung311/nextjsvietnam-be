import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '@app/common/IResponse';

export class QuestionResponse implements IResponse {
  @ApiProperty({
    example: 200,
    description: 'status code',
  })
  statusCode: number;

  @ApiProperty({ example: 'OK' })
  message: string;

  @ApiProperty({
    example: {
      data: { id: '2341211', data: 'bug', userId: '123123', name: 'ádasd', createAt: new Date(), updateAt: new Date() },
    },
    nullable: true,
  })
  data: {
    id: string;
    data: string;
    stars: {
      id: number;
      data: string;
      star: number;
      createdAt: Date;
      updatedAt: Date;
      questionId: number;
    };
    categorys: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    createAt: Date;
    updateAt: Date;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
