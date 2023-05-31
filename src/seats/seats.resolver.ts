import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeatsService } from './seats.service';
import { Seat } from './entities/seat.entity';
import { CreateSeatInput } from './dto/create-seat.input';
import { UpdateSeatInput } from './dto/update-seat.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CurrentUser } from 'src/auth/curr-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Seat)
export class SeatsResolver {
	constructor(private readonly seatsService: SeatsService) {}

	@Mutation(() => Seat)
	createSeat(@Args('createSeatInput') createSeatInput: CreateSeatInput) {
		return this.seatsService.create(createSeatInput);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Seat)
	async reserveSeat(
		@Args('seatId') seatId: number,
		@CurrentUser() user: User
	) {
		if (!user) throw new Error('User not found');
		return (await this.seatsService.reserveSeat(seatId, user)).seat;
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Seat)
	async purchaseSeat(
		@Args('seatId') seatId: number,
		@CurrentUser() user: User
	) {
		if (!user) throw new Error('User not found');
		return (await this.seatsService.purchaseSeat(seatId, user)).seat;
	}

	@Query(() => [Seat], { name: 'findAllAvailableSeatsInSection' })
	findAllAvailableSeatsInSection(
		@Args('sectionId', { type: () => Int }) sectionId: number
	) {
		return this.seatsService.findAllAvailableSeatsInSection(sectionId);
	}

	@Query(() => [Seat], { name: 'seats' })
	findAll() {
		return this.seatsService.findAll();
	}

	@Query(() => Seat, { name: 'seat' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.seatsService.findOne(id);
	}

	@Mutation(() => Seat)
	updateSeat(@Args('updateSeatInput') updateSeatInput: UpdateSeatInput) {
		return this.seatsService.update(updateSeatInput.id, updateSeatInput);
	}

	@Mutation(() => Seat)
	removeSeat(@Args('id', { type: () => Int }) id: number) {
		return this.seatsService.remove(id);
	}
}
