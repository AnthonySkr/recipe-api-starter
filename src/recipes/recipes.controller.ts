import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import type { PaginatedRecipes, Recipe } from './recipes.service';
import { QueryRecipeDto } from './dto/query-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(@Query() query: QueryRecipeDto): PaginatedRecipes {
    return this.recipesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Recipe {
    return this.recipesService.findOne(id);
  }
}
