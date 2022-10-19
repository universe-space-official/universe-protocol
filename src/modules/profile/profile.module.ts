import { Module } from '@nestjs/common';
import { OrbisService } from '../orbis/orbis.service.js';
import { NftService } from '../nft/nft.service.js';
import { ProfileResolver } from './profile.resolver.js';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EthersModule } from 'nestjs-ethers';

@Module({
    imports: [TypeOrmModule.forFeature([]), EthersModule.forRoot()],
    providers: [
        ProfileResolver,
        OrbisService,
        NftService
    ],
    exports: []
})
export class ProfileModule { }
