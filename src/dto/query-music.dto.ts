import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class MusicQueryDTO {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number;

  @ApiProperty({
    description: 'Limit number',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number;

  @ApiProperty({
    description: 'Search query',
    example: 'taylor',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  search: string;
}

export class RankQueryDTO {
  @ApiProperty({
    description: 'Limit number',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number;
}
