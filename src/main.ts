// organize-imports-ignore
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AppEnvs } from './constants';
import { getSentryConfig } from './config/get-sentry-config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService>(ConfigService);
  if (!Boolean(configService.get('DISABLE_SENTRY'))) {
    Sentry.init(getSentryConfig(configService));
  }
  await app.resolve<PinoLogger>(PinoLogger);

  // Non-production only add in swagger documentation
  if (configService.get('APP_ENV') !== AppEnvs.PRODUCTION) {
    const options = new DocumentBuilder()
      .setTitle('{{template}} Service')
      .setDescription('A NestJS Olyvia template repo built with ❤.')
      .setVersion('1.0')
      .addTag('{{template}}')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  app.useLogger(app.get(Logger));

  await app.init();
  await app.listen(configService.get<number>('PORT'), '0.0.0.0');
}

bootstrap();
