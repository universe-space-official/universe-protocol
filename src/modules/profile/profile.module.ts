import { Module } from '@nestjs/common';
import { OrbisService } from '../orbis/orbis.service.js';
import { NftService } from '../nft/nft.service.js';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  imports: [],
  providers: [ProfileResolver, OrbisService, NftService],
  exports: [],
})
export class ProfileModule {}
