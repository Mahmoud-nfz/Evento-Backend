import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(Event)
		private eventRepository: Repository<Event>
	) {}

	create(createEventInput: CreateEventInput) {
		return this.eventRepository.save(createEventInput);
	}

	findAll() {
		return this.eventRepository.find();
	}

	findOne(id: number) {
		return this.eventRepository.findOne({ where: { id } });
	}

	update(id: number, updateEventInput: UpdateEventInput) {
		return this.eventRepository.save({ id, ...updateEventInput });
	}

	remove(id: number) {
		return this.eventRepository.softDelete({ id });
	}
}
