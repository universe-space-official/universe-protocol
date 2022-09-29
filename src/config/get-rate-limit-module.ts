import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

export function getRateLimitModule(): DynamicModule[] {
  if (process.env.DISABLE_RATE_LIMITING) {
    return [];
  }

  return [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLE_TTL'),
        limit: configService.get('THROTTLE_LIMIT'),
      }),
    }),
  ];
}
