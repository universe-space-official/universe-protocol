import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftService } from './nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [NftService],
  controllers: []
})
export class NftModule {}
