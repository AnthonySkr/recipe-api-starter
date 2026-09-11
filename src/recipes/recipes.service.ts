import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Difficulty } from './difficulty.enum';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  difficulty: Difficulty;
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
    const recipes = query.difficulty
      ? this.readAll().filter((r) => r.difficulty === query.difficulty)
      : this.readAll();
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

  create(dto: CreateRecipeDto): Recipe {
    const recipes = this.readAll();
    this.assertTitleAvailable(recipes, dto.title);

    const recipe: Recipe = {
      id: Math.max(0, ...recipes.map((r) => r.id)) + 1,
      ...dto,
      createdAt: new Date().toISOString(),
    };
    recipes.push(recipe);
    this.storage.write(RECIPES_FILE, recipes);
    return recipe;
  }

  update(id: number, dto: UpdateRecipeDto): Recipe {
    const recipes = this.readAll();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    if (dto.title !== undefined) {
      this.assertTitleAvailable(recipes, dto.title, id);
    }

    const updated: Recipe = { ...recipes[index], ...dto };
    recipes[index] = updated;
    this.storage.write(RECIPES_FILE, recipes);
    return updated;
  }

  private assertTitleAvailable(
    recipes: Recipe[],
    title: string,
    excludeId?: number,
  ): void {
    const normalized = title.toLowerCase();
    const taken = recipes.some(
      (r) => r.id !== excludeId && r.title.toLowerCase() === normalized,
    );
    if (taken) {
      throw new ConflictException(
        `A recipe with title "${title}" already exists`,
      );
    }
  }

  private readAll(): Recipe[] {
    return this.storage.read<Recipe[]>(RECIPES_FILE);
  }
}
