import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { QueryRecipeDto } from './dto/query-recipe.dto';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  prepTimeMinutes: number;
  servings: number;
  createdAt: string;
}

export interface PaginatedRecipes {
  data: Recipe[];
  total: number;
  page: number;
  limit: number;
}

const RECIPES_FILE = 'recipes.json';
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class RecipesService {
  constructor(private readonly storage: StorageService) {}

  findAll(query: QueryRecipeDto): PaginatedRecipes {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const recipes = this.readAll();
    const start = (page - 1) * limit;

    return {
      data: recipes.slice(start, start + limit),
      total: recipes.length,
      page,
      limit,
    };
  }

  findOne(id: number): Recipe {
    const recipe = this.readAll().find((r) => r.id === id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    return recipe;
  }

  private readAll(): Recipe[] {
    return this.storage.read<Recipe[]>(RECIPES_FILE);
  }
}
