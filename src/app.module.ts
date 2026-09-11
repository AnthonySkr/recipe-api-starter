import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StorageModule } from './storage/storage.module';
import { RecipesModule } from './recipes/recipes.module';

// TODO : importer RecipesModule ici une fois créé (`nest generate module recipes`)
// TODO : enregistrer ton guard globalement via APP_GUARD (voir le sujet, section "Authentification")

@Module({
  imports: [StorageModule, RecipesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
