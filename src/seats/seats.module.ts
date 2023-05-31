import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsResolver } from './seats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';

@Module({
	providers: [SeatsResolver, SeatsService],
	imports: [TypeOrmModule.forFeature([Seat])],
	exports: [SeatsService],
})
export class SeatsModule {}
