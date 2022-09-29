import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { DummyController } from './dummy.controller';
import { DummyService } from './dummy.service';

describe('DummyController', () => {
  let controller: DummyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DummyController],
      providers: [DummyService],
      imports: [LoggerModule.forRoot()],
    }).compile();

    controller = module.get<DummyController>(DummyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
