import { PinoLogger } from 'nestjs-pino';
export declare class DummyService {
    private readonly pinoLogger;
    constructor(pinoLogger: PinoLogger);
    boom(): Promise<void>;
}
