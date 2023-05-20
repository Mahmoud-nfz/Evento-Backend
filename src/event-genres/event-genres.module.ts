import { Module } from '@nestjs/common';
import { EventGenresService } from './event-genres.service';
import { EventGenresResolver } from './event-genres.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventGenre } from './entities/event-genre.entity';

@Module({
	providers: [EventGenresResolver, EventGenresService],
	imports: [TypeOrmModule.forFeature([EventGenre])],
})
export class EventGenresModule {}
