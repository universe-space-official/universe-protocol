import { ConfigService } from '@nestjs/config';
import { Params as PinoParams } from 'nestjs-pino';
import { AppEnvs } from '../constants';

export function getLoggerConfig(configService: ConfigService): PinoParams {
  const appEnv = configService.get<string>('APP_ENV');
  const isProductionEnv = appEnv === AppEnvs.PRODUCTION;
  const isTestEnv = appEnv === AppEnvs.TEST;
  const isDevEnv = appEnv === AppEnvs.DEVELOPMENT;
  const forRoutes = isTestEnv ? [] : ['(.*)'];

  return {
    pinoHttp: {
      level: !isProductionEnv ? 'debug' : 'info',
      redact: ['req.headers.cookie', 'req.headers.authorization'],
      transport: {
        target: isDevEnv ? 'pino-pretty' : undefined,
      },
    },
    forRoutes,
  };
}
