import { Module } from '@nestjs/common';
// import { OrbisService } from 'modules/orbis/orbis.service';
import { NftService } from '../nft/nft.service';
import { ProfileResolver } from './profile.resolver';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [
        ProfileResolver,
        // OrbisService,
        NftService
    ],
    exports: [] // What is this? what do i need to export and why 
})
export class ProfileModule { }
