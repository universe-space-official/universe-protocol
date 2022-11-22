import { Module } from '@nestjs/common';
import { NftService } from './nft.service';

@Module({
  imports: [],
  providers: [NftService],
  controllers: [],
})
export class NftModule {}
