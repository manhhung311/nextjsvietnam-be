import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatedQuestionsDTO {
  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  data: string;

  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  category: number;

  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  name: string;
}
