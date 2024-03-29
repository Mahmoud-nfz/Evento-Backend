import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEventGenreInput } from './dto/create-event-genre.input';
import { UpdateEventGenreInput } from './dto/update-event-genre.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventGenre } from './entities/event-genre.entity';

@Injectable()
export class EventGenresService {
	constructor(
		@InjectRepository(EventGenre)
		private eventGenreRepository: Repository<EventGenre>
	) {}
	async create(
		createEventGenreInput: CreateEventGenreInput
	): Promise<EventGenre> {
		const existingEventGenre = await this.eventGenreRepository.findOne({
			where: { codeName: createEventGenreInput.codeName },
		});
		if (existingEventGenre) {
			throw new Error('Event Genre already exists');
		}
		return this.eventGenreRepository.save(createEventGenreInput);
	}

	findAll(): Promise<EventGenre[]> {
		return this.eventGenreRepository.find();
	}

	findOne(id: number, events: boolean = false): Promise<EventGenre> {
		this.eventGenreRepository
			.findOne({
				where: { id },
				relations: events ? ['events'] : [],
			})
			.then((eventGenre) => {
				console.log(eventGenre);
			});
		return this.eventGenreRepository.findOne({
			where: { id },
			relations: events ? ['events'] : [],
		});
	}

	update(updateEventGenreInput: UpdateEventGenreInput): Promise<EventGenre> {
		return this.eventGenreRepository.save(updateEventGenreInput);
	}

	remove(id: number) {
		return this.eventGenreRepository.softDelete({ id });
	}
}
