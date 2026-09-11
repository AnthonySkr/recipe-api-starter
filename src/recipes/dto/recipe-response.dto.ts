import { ApiProperty } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

export class RecipeDto extends CreateRecipeDto {
  @ApiProperty({ description: 'Identifiant généré par le serveur', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Date de création (ISO 8601), générée par le serveur',
    example: '2026-01-05T08:00:00.000Z',
  })
  createdAt: string;
}

export class PaginatedRecipesDto {
  @ApiProperty({ type: [RecipeDto] })
  data: RecipeDto[];

  @ApiProperty({
    description: 'Nombre total de recettes (après filtre)',
    example: 20,
  })
  total: number;

  @ApiProperty({ description: 'Page courante', example: 1 })
  page: number;

  @ApiProperty({ description: 'Taille de page', example: 10 })
  limit: number;
}
