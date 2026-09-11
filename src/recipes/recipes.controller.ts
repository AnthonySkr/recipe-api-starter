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
import { RecipesService } from './recipes.service';
import type { PaginatedRecipes, Recipe } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AdminOnly } from '../common/decorators/admin.decorator';

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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateRecipeDto): Recipe {
    return this.recipesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRecipeDto,
  ): Recipe {
    return this.recipesService.update(id, body);
  }

  @AdminOnly()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.recipesService.remove(id);
  }
}
