import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

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

const RECIPES_FILE = 'recipes.json';

@Injectable()
export class RecipesService {
  constructor(private readonly storage: StorageService) {}

  findAll(): Recipe[] {
    return this.storage.read<Recipe[]>(RECIPES_FILE);
  }

  findOne(id: number): Recipe {
    const recipe = this.findAll().find((r) => r.id === id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }
    return recipe;
  }
}
