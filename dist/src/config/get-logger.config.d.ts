import { ConfigService } from '@nestjs/config';
import { Params as PinoParams } from 'nestjs-pino';
export declare function getLoggerConfig(configService: ConfigService): PinoParams;
