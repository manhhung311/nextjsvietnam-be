import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ActivatedDTO {
  @ApiProperty({
    example: '',
    description: 'asaa',
  })
  @IsNotEmpty()
  token: string;
}
