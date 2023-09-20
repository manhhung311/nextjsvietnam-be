import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryQuestionsDTO {
  @ApiProperty({
    example: '',
    description: '1',
  })
  @IsNotEmpty()
  star?: number;

  @ApiProperty({
    example: '',
    description: 'core',
  })
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '',
    description: 'tiêu đề bài viếts',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '',
    description: 'tên người đăng',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    example: '',
    description: 'tên người đăng',
  })
  @IsNotEmpty()
  offset: number;
}
