import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrbisService } from './orbis.service';

import { EthersModule } from 'nestjs-ethers';

@Module({
    imports: [TypeOrmModule.forFeature([]), EthersModule.forRoot()],
    providers: [OrbisService],
    controllers: []
})
export class OrbisModule { }
