import { Module } from '@nestjs/common';
import { OrbisService } from './orbis.service';

@Module({
  imports: [],
  providers: [OrbisService],
  controllers: [],
})
export class OrbisModule {}
