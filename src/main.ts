import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CommonConfigService } from './common/common-config.service';

async function bootstrap() {
  const isUseFastify = process.env['USE_FASTIFY'] === 'true';
  let app;

  if (isUseFastify) {
    app = await NestFactory.create(AppModule, new FastifyAdapter());
  } else {
    app = await NestFactory.create(AppModule);
  }
  const commonConfigService = app.get(CommonConfigService);

  await app.listen(commonConfigService.PORT);
}
bootstrap();
