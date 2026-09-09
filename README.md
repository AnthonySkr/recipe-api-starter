# RecipeAPI — point de départ

Projet de départ pour l'épreuve. Déjà en place :
- Scaffold NestJS 11 + configuration (`prefix /api`, CORS, `ValidationPipe`, Swagger monté sur `/api/docs`)
- `StorageService` (lecture/écriture JSON, module `@Global()`)
- Données de seed : `src/data/recipes.json` (20 recettes), `src/data/api-keys.json` (clés valides)

## Installation

```bash
npm install
npm run start:dev
```

L'API répond sur `http://localhost:3000/api`.

## Ce qu'il reste à construire

Voir le sujet de l'épreuve fourni séparément.
