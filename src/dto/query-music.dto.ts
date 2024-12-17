import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
export class MusicQueryDTO {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    description: 'Limit number',
    example: 10,
    required: false,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Search query',
    required: false,
  })
  @IsString()
  search: string;

  @ApiProperty({
    description: 'Order',
    enum: Order,
    required: false,
  })
  @IsString()
  order: Order;
}
