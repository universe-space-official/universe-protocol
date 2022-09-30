import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { APP_GUARD } from '@nestjs/core';
import { getLoggerConfig } from './config/get-logger.config';
import { configSchema } from './config/config-schema';
// import { getRateLimitModule } from './config/get-rate-limit-module';
// import { ThrottlerGuard } from '@nestjs/throttler';
import { DummyModule } from './modules/dummy/dummy.module'; // Remove me

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


// @TODO: For some reason security modules are being broken right now, we should integrate them
// in the future
@Module({
  imports: [
    DummyModule,
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getLoggerConfig,
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ headers: req.headers }),
      autoSchemaFile: true,
      playground: true,
      driver: ApolloDriver
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: configSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    //...getRateLimitModule(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule { }
