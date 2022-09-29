import { DummyService } from './dummy.service';
export declare class DummyController {
    private readonly dummyService;
    constructor(dummyService: DummyService);
    findAll(): string[];
    findbyUuid(dummyUuidString: string): string;
    create(body: string): string;
    boom(): Promise<void>;
}
