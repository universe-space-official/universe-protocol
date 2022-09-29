/* eslint-disable @typescript-eslint/no-empty-function */
import { LoggerService } from '@nestjs/common';

export class TestLogger implements LoggerService {
  log(): void {}
  error(): void {}
  warn(): void {}
  debug(): void {}
  verbose(): void {}
  setContext(): void {}
}
