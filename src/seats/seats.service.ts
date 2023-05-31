import { Injectable } from '@nestjs/common';
import { CreateSeatInput } from './dto/create-seat.input';
import { UpdateSeatInput } from './dto/update-seat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { CreateSeatingSectionInput } from 'src/seating-sections/dto/create-seating-section.input';
import { SeatingSection } from 'src/seating-sections/entities/seating-section.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeatsService {
	constructor(
		@InjectRepository(Seat) private seatRepository: Repository<Seat>,
		private dataSource: DataSource
	) {}
	create(createSeatInput: CreateSeatInput) {
		return this.seatRepository.save(createSeatInput);
	}

	findAll() {
		return this.seatRepository.find();
	}

	findOne(id: number) {
		return this.seatRepository.findOne({ where: { id } });
	}

	update(id: number, updateSeatInput: UpdateSeatInput) {
		return this.seatRepository.update({ id }, updateSeatInput);
	}

	remove(id: number) {
		return this.seatRepository.delete({ id });
	}

	async createMany(seatingSection: SeatingSection) {
		const numberOfSeats = seatingSection.numberOfSeats;
		const seats = [];
		for (let i = 0; i < numberOfSeats; i++) {
			const seat = new Seat();
			seat.seatingSection = seatingSection;
			seat.name = seatingSection.name + ' ' + (i + 1);
			seat.price = seatingSection.price;
			seat.isSelling = seatingSection.isSelling;
			seats.push(await this.seatRepository.save(seat));
		}
		return seats;
	}

	async setSelling(seatingSectionId: number) {
		const seats = await this.seatRepository.find({
			where: { seatingSection: { id: seatingSectionId } },
		});

		await this.dataSource.transaction(async (manager) => {
			for (let i = 0; i < seats.length; i++) {
				const seat = seats[i];
				seat.isSelling = true;
				await manager.save(seat);
			}
		});
		return true;
	}

	async reserveSeat(seatId: number, user: User) {
		let success = false;
		let seat: Seat = null;
		await this.dataSource
			.transaction(async (manager) => {
				seat = await manager.findOne(Seat, {
					where: {
						id: seatId,
						isSelling: true,
						userReserved: false,
						userPurchased: false,
					},
					relations: ['userReserved', 'userPurchased'],
				});
				if (!seat) throw new Error('Seat not found');
				if (!seat.isSelling) throw new Error('Seat not selling');
				if (seat.userReserved)
					throw new Error('Seat already reserved by another user');
				if (seat.userPurchased)
					throw new Error('Seat already purchased by another user');
				seat.userReserved = user;
				await manager.save(seat);
			})
			.then(() => {
				success = true;
				setTimeout(async () => {
					await this.dataSource.transaction(async (manager) => {
						const seat = await manager.findOne(Seat, {
							where: {
								id: seatId,
							},
							relations: ['userReserved', 'userPurchased'],
						});
						if (!seat.userPurchased) seat.userReserved = null;
						await manager.save(seat);
					});
				}, 1000 * 60 * 1);
			});
		return {
			success,
			seat,
		};
	}

	async purchaseSeat(seatId: number, user: User) {
		let success = false;
		let seat: Seat = null;
		await this.dataSource
			.transaction(async (manager) => {
				seat = await manager.findOne(Seat, {
					where: {
						id: seatId,
					},
					relations: ['userReserved', 'userPurchased'],
				});
				if (!seat) throw new Error('Seat not found');
				if (!seat.isSelling) throw new Error('Seat not selling');
				if (seat.userReserved.id != user.id)
					throw new Error('Seat reserved by another user');
				if (seat.userPurchased)
					throw new Error('Seat already purchased by another user');
				seat.userPurchased = user;
				seat.userReserved = user;
				await manager.save(seat);
			})
			.then(() => {
				success = true;
			});
		return {
			success,
			seat,
		};
	}

	findAllAvailableSeatsInSection(sectionId: number) {
		return this.seatRepository.find({
			where: {
				seatingSection: {
					id: sectionId,
				},
				isSelling: true,
				userReserved: IsNull(),
				userPurchased: IsNull(),
			},
		});
	}
}
