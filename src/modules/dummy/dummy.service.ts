import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { toError } from './../../utils/error';

@Injectable()
export class DummyService {
  constructor(
    @InjectPinoLogger(DummyService.name)
    private readonly pinoLogger: PinoLogger,
  ) {}

  async boom(): Promise<void> {
    try {
      throw new Error('aw shoot');
    } catch (e) {
      const error = toError(e);
      const message = 'it went boom';
      this.pinoLogger.error(`${message}: %o`, { error: error.message });
      throw new Error(message);
    }
  }
}
