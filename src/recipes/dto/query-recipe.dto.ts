import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Difficulty } from '../difficulty.enum';

export class QueryRecipeDto {
  @ApiPropertyOptional({
    description: 'Numéro de page (commence à 1)',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Nombre de recettes par page',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filtre sur la difficulté',
    enum: Difficulty,
    enumName: 'Difficulty',
    example: Difficulty.EASY,
  })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;
}
