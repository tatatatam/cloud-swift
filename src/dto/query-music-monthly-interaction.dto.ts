import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIdDTO {
  @ApiProperty({
    description: 'params music id',
    example: '6762700ed39df0e1f9788348',
  })
  @IsString()
  id: string;
}
