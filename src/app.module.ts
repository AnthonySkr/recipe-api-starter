import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { StorageModule } from './storage/storage.module';
import { RecipesModule } from './recipes/recipes.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StorageModule, RecipesModule, AuthModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class AppModule {}
