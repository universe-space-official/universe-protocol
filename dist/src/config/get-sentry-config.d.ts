import { ConfigService } from '@nestjs/config';
import { NodeOptions } from '@sentry/node';
export declare function getSentryConfig(configService: ConfigService): NodeOptions;
