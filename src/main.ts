import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
