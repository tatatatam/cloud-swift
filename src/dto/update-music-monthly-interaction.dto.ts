import { PartialType } from '@nestjs/swagger';
import { CreateMusicMonthlyInteractionDto } from './create-music-monthly-interaction.dto';

export class UpdateMusicMonthlyInteractionDto extends PartialType(
  CreateMusicMonthlyInteractionDto,
) {}
