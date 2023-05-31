import { Injectable } from '@nestjs/common';
import { CreateSeatingSectionInput } from './dto/create-seating-section.input';
import { UpdateSeatingSectionInput } from './dto/update-seating-section.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatingSection } from './entities/seating-section.entity';
import { Repository } from 'typeorm';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class SeatingSectionsService {
	constructor(
		@InjectRepository(SeatingSection)
		private seatingSectionRepository: Repository<SeatingSection>,
		private seatsService: SeatsService
	) {}

	async create(createSeatingSectionInput: CreateSeatingSectionInput) {
		const seatingSection = await this.seatingSectionRepository.save(
			createSeatingSectionInput
		);
		const seats = await this.seatsService.createMany(seatingSection);
		return { seatingSection, seats };
	}

	findAll() {
		return this.seatingSectionRepository.find();
	}

	findByEventId(eventId: number) {
		return this.seatingSectionRepository.find({
			where: { event: { id: eventId } },
			relations: ['event'],
		});
	}

	findEventSeatsBySeatingSection(eventId: number) {
		return this.seatingSectionRepository.find({
			where: { event: { id: eventId } },
			relations: ['event', 'seats'],
		});
	}

	findOne(id: number) {
		return this.seatingSectionRepository.findOne({ where: { id } });
	}

	update(id: number, updateSeatingSectionInput: UpdateSeatingSectionInput) {
		return this.seatingSectionRepository.update(
			{ id },
			updateSeatingSectionInput
		);
	}

	remove(id: number) {
		return this.seatingSectionRepository.delete({ id });
	}

	async seatingSectionBelongsToUser(
		seatingSectionId: number,
		userId: number
	) {
		const seatingSection = await this.seatingSectionRepository.findOne({
			where: { id: seatingSectionId },
			relations: ['event', 'event.owner'],
		});
		if (!seatingSection) return false;
		if (!seatingSection.event) return false;
		if (!seatingSection.event.owner) return false;
		return seatingSection.event.owner.id === userId;
	}

	async setSelling(seatingSectionId: number) {
		const seatingSection = await this.seatingSectionRepository.findOne({
			where: { id: seatingSectionId },
		});
		if (!seatingSection) return false;
		seatingSection.isSelling = true;
		this.seatsService.setSelling(seatingSectionId);
		return await this.seatingSectionRepository.save(seatingSection);
	}
}
