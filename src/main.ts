import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RecipeAPI')
    .setDescription(
      'API REST de gestion de recettes de cuisine.\n\n' +
        'Toutes les routes (sauf `GET /api` et `POST /auth/register`) nécessitent le header `X-API-Key`.\n\n' +
        'La suppression de recettes (`DELETE /recipes/:id`) est réservée aux comptes `admin`.',
    )
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'api-key')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    ui: false,
    raw: ['json'],
    jsonDocumentUrl: 'api/docs-json',
  });

  const { apiReference } = await import('@scalar/nestjs-api-reference');
  app.use('/api/docs', apiReference({ url: '/api/docs-json' }));

  await app.listen(process.env.PORT ?? 3000);

  console.log(`\nRecipeAPI running on  : http://localhost:3000/api`);
  console.log(`Documentation Scalar : http://localhost:3000/api/docs`);
}
bootstrap();
