import 'dotenv-defaults/config';

const mandatoryEnvironmentVariables = [
  'DATABASE_HOST',
  'DATABASE_NAME',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'DATABASE_PORT',
];

const missingEnvironmentVariables = mandatoryEnvironmentVariables.filter(
  (variable) => !process.env[variable],
);
if (missingEnvironmentVariables.length > 0) {
  console.error(
    `Environment Variables [${missingEnvironmentVariables.join(',')}] not defined, terminating ...`,
  );
  process.exit(1);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // api prefixing
  app.setGlobalPrefix('api', { exclude: [''] });

  // swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Candidates Api')
    .setDescription('The Candidates API description')
    .setVersion('1.0')
    .addTag('Candidates')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
