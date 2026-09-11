import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import type { PaginatedRecipes, Recipe } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PaginatedRecipesDto, RecipeDto } from './dto/recipe-response.dto';
import { AdminOnly } from '../common/decorators/admin.decorator';

@ApiTags('Recipes')
@ApiSecurity('api-key')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Header X-API-Key absent',
})
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Clé API invalide' })
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({
    summary: 'Liste paginée des recettes',
    description:
      'Pagination via `page` / `limit` (défauts : 1 / 10, limit max 50), filtre optionnel par `difficulty`.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Page de recettes',
    type: PaginatedRecipesDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Paramètre de query invalide',
  })
  @Get()
  findAll(@Query() query: QueryRecipeDto): PaginatedRecipes {
    return this.recipesService.findAll(query);
  }

  @ApiOperation({ summary: "Détail d'une recette" })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recette trouvée',
    type: RecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id non numérique',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recette introuvable',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Recipe {
    return this.recipesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Créer une recette',
    description: '`id` et `createdAt` sont générés par le serveur.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Recette créée',
    type: RecipeDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Body invalide' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Une recette avec ce titre existe déjà',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateRecipeDto): Recipe {
    return this.recipesService.create(body);
  }

  @ApiOperation({
    summary: 'Modifier partiellement une recette',
    description: 'Seuls les champs fournis sont modifiés.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recette modifiée',
    type: RecipeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id non numérique ou body invalide',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recette introuvable',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Le nouveau titre est déjà utilisé par une autre recette',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRecipeDto,
  ): Recipe {
    return this.recipesService.update(id, body);
  }

  @ApiOperation({ summary: '[Admin] Supprimer une recette' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Recette supprimée',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id non numérique',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Clé API invalide ou rôle non admin',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recette introuvable',
  })
  @AdminOnly()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.recipesService.remove(id);
  }
}
