import { Module } from '@nestjs/common';
import { SeatingSectionsService } from './seating-sections.service';
import { SeatingSectionsResolver } from './seating-sections.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatingSection } from './entities/seating-section.entity';
import { EventsModule } from '../events/events.module';
import { SeatsModule } from 'src/seats/seats.module';

@Module({
	providers: [SeatingSectionsResolver, SeatingSectionsService],
	imports: [
		TypeOrmModule.forFeature([SeatingSection]),
		EventsModule,
		SeatsModule,
	],
})
export class SeatingSectionsModule {}
