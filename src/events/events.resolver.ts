import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => Event)
export class EventsResolver {
	constructor(private readonly eventsService: EventsService) {}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin', 'eventManager')
	@Mutation(() => Event)
	createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
		return this.eventsService.create(createEventInput);
	}

	@Query(() => [Event], { name: 'events' })
	findAll() {
		return this.eventsService.findAll();
	}

	@Query(() => Event, { name: 'event' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.eventsService.findOne(id);
	}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin', 'eventManager')
	@Mutation(() => Event)
	updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
		return this.eventsService.update(updateEventInput.id, updateEventInput);
	}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin', 'eventManager')
	@Mutation(() => Event)
	removeEvent(@Args('id', { type: () => Int }) id: number) {
		return this.eventsService.remove(id);
	}
}
