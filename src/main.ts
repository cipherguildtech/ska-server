import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';

function loadEnvironment() {
  const envFiles = [join(process.cwd(), '.env'), join(process.cwd(), 'prisma', '.env')];

  for (const envFile of envFiles) {
    if (existsSync(envFile)) {
      dotenvConfig({ path: envFile, override: false });
    }
  }
}

async function bootstrap() {
  loadEnvironment();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.enableShutdownHooks();
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Nest application listening on port ${port}`);
}
bootstrap();
