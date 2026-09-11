import { Controller, Get } from '@nestjs/common';
import { Recipe, RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(): Recipe[] {
    return this.recipesService.findAll();
  }
}
