# RecipeAPI

API REST de gestion d'un catalogue de recettes de cuisine, construite avec **NestJS 11** : CRUD paginé et filtrable, validation `class-validator`, authentification par clé API avec rôles `user` / `admin`, documentation **Scalar**.

## Prérequis

- Node.js **22.12 ou plus** (22 LTS)
- npm 10 ou plus

## Installation et lancement

```bash
npm install
npm run start:dev    # développement
npm run build        # compilation dans dist/
npm run start:prod   # lance la version compilée
```

L'API répond sur `http://localhost:3000/api` (`GET /api` renvoie `{"status":"ok"}`, sans clé).

## Documentation

| URL | Contenu |
|---|---|
| `http://localhost:3000/api/docs` | Documentation interactive **Scalar** : routes, paramètres, schémas, codes de réponse |
| `http://localhost:3000/api/docs-json` | Spec OpenAPI brute (JSON) |

## Authentification

Toutes les routes exigent le header `X-API-Key`, sauf `GET /api` et `POST /api/auth/register`. Header absent → `401`, clé inconnue → `403`.

| Clé | Propriétaire | Rôle |
|---|---|---|
| `exam-nestjs-2026-key-01` | correcteur | **admin** |
| `exam-nestjs-2026-key-02` | etudiant-test | user |

Seul le rôle `admin` peut supprimer une recette (`DELETE /recipes/:id`, sinon `403`). Un compte `user` peut être créé via `POST /api/auth/register`.
