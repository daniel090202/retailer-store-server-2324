import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const serverPort = configService.get<number>('SERVER_PORT');

  await app.listen((serverPort as number) || 8080);
}
bootstrap();
