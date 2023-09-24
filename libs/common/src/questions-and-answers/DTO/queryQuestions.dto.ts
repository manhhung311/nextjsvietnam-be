import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class QueryQuestionsDTO {
  @ApiProperty({
    example: '',
    description: '1',
  })
  star?: number;

  @ApiProperty({
    example: '',
    description: 'category',
  })
  category?: string;

  @ApiProperty({
    example: '',
    description: 'tiêu đề bài viếts',
  })
  title?: string;

  @ApiProperty({
    example: '',
    description: 'tên người đăng',
  })
  name?: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Type(() => Number)
  offset?: number;
}
