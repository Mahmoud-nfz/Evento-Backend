import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeatingSectionsService } from './seating-sections.service';
import { SeatingSection } from './entities/seating-section.entity';
import { CreateSeatingSectionInput } from './dto/create-seating-section.input';
import { UpdateSeatingSectionInput } from './dto/update-seating-section.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/curr-user.decorator';
import { User } from '../users/entities/user.entity';
import { EventsService } from '../events/events.service';

@Resolver(() => SeatingSection)
export class SeatingSectionsResolver {
	constructor(
		private readonly seatingSectionsService: SeatingSectionsService,
		private readonly eventService: EventsService
	) {}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin', 'eventManager')
	@Mutation(() => SeatingSection)
	async createSeatingSection(
		@Args('createSeatingSectionInput')
		createSeatingSectionInput: CreateSeatingSectionInput,
		@CurrentUser() user: User
	) {
		if (
			!(await this.eventService.eventBelongsToUser(
				createSeatingSectionInput.event.id,
				user.id
			))
		)
			throw new ForbiddenException(
				'You do not have permission to create a seating section for this event.'
			);
		return (
			await this.seatingSectionsService.create(createSeatingSectionInput)
		).seatingSection;
	}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin', 'eventManager')
	@Mutation(() => SeatingSection)
	async setSellingSeatingSection(
		@Args('seatingSectionId', { type: () => Int }) seatingSectionId: number,
		@CurrentUser() user: User
	) {
		if (
			!(await this.seatingSectionsService.seatingSectionBelongsToUser(
				seatingSectionId,
				user.id
			))
		)
			throw new ForbiddenException(
				'You do not have permission to create a seating section for this event.'
			);
		return await this.seatingSectionsService.setSelling(seatingSectionId);
	}

	@Query(() => [SeatingSection], { name: 'findSeatingSectionsByEvent' })
	async findByEventId(@Args('eventId', { type: () => Int }) eventId: number) {
		return this.seatingSectionsService.findByEventId(eventId);
	}

	@Query(() => [SeatingSection], {
		name: 'findEventSeatsBySeatingSection',
	})
	async findEventSeatsBySeatingSection(
		@Args('eventId', { type: () => Int }) eventId: number
	) {
		return this.seatingSectionsService.findEventSeatsBySeatingSection(
			eventId
		);
	}

	@Query(() => [SeatingSection], { name: 'seatingSections' })
	findAll() {
		return this.seatingSectionsService.findAll();
	}

	@Query(() => SeatingSection, { name: 'seatingSection' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.seatingSectionsService.findOne(id);
	}

	@Mutation(() => SeatingSection)
	async updateSeatingSection(
		@Args('updateSeatingSectionInput')
		updateSeatingSectionInput: UpdateSeatingSectionInput,
		@CurrentUser() user: User
	) {
		if (
			!(await this.eventService.eventBelongsToUser(
				updateSeatingSectionInput.event.id,
				user.id
			))
		)
			throw new ForbiddenException(
				'You do not have permission to create a seating section for this event.'
			);
		return this.seatingSectionsService.update(
			updateSeatingSectionInput.id,
			updateSeatingSectionInput
		);
	}

	@Mutation(() => SeatingSection)
	async removeSeatingSection(
		@Args('id', { type: () => Int }) id: number,
		@CurrentUser() user: User
	) {
		if (!(await this.eventService.eventBelongsToUser(id, user.id)))
			throw new ForbiddenException(
				'You do not have permission to create a seating section for this event.'
			);
		return this.seatingSectionsService.remove(id);
	}
}
