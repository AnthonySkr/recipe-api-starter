import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Difficulty } from '../difficulty.enum';

export class CreateRecipeDto {
  @ApiProperty({
    description:
      'Titre unique (comparaison insensible à la casse et aux espaces)',
    example: 'Tarte aux pommes',
    maxLength: 200,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Description de la recette',
    example: 'Une tarte aux pommes classique, croustillante et fondante.',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'Liste des ingrédients (au moins un)',
    example: ['1 pâte brisée', '4 pommes', '80 g de sucre'],
    type: [String],
    minItems: 1,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @ApiProperty({
    description: 'Niveau de difficulté',
    enum: Difficulty,
    enumName: 'Difficulty',
    example: Difficulty.EASY,
  })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Temps de préparation en minutes',
    example: 45,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  prepTimeMinutes: number;

  @ApiProperty({
    description: 'Nombre de parts',
    example: 6,
    minimum: 1,
    maximum: 50,
  })
  @IsInt()
  @Min(1)
  @Max(50)
  servings: number;
}
