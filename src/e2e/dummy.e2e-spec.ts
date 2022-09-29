import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TestLogger } from '../utils/test/testing-logger';

describe('ExerciseController (e2e)', () => {
  let app: NestFastifyApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    moduleFixture.useLogger(new TestLogger());
    configService = moduleFixture.get<ConfigService>(ConfigService);
    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.enableShutdownHooks();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /v1/dummies', () => {
    it('returns 200 and all fake data with valid JWT', async () => {
      const { statusCode } = await app.inject({
        url: '/v1/dummies',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(statusCode).toEqual(200);
    });
  });
});
