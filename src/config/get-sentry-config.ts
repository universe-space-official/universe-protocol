import { ConfigService } from '@nestjs/config';
import { NodeOptions } from '@sentry/node';
import { AppEnvs } from '../constants';

export function getSentryConfig(configService: ConfigService): NodeOptions {
  const appEnv = configService.get<string>('APP_ENV');
  const isDevEnv = appEnv === AppEnvs.DEVELOPMENT;

  return {
    dsn: configService.get<string>('SENTRY_DSN'),
    environment: configService.get<string>('APP_ENV'),
    debug: isDevEnv,
    release: configService.get<string>('SENTRY_RELEASE'),
  };
}
