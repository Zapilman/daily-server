import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PREFIX } from './_core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(8080);
}
bootstrap();
