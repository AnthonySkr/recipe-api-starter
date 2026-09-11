import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import type { Recipe } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(): Recipe[] {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Recipe {
    return this.recipesService.findOne(id);
  }
}
