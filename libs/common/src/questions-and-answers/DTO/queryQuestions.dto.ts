import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class QueryQuestionsDTO {
  @ApiProperty({
    example: '',
    description: '1',
    required: false,
  })
  star?: number;

  @ApiProperty({
    example: '',
    description: 'category',
    required: false,
  })
  category?: string;

  @ApiProperty({
    example: '',
    description: 'tiêu đề bài viết',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: '',
    description: 'tên người đăng',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: '',
    description: '',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: '',
    description: '',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;
}
