import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrbisService } from './orbis.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [OrbisService],
    controllers: []
})
export class OrbisModule { }
