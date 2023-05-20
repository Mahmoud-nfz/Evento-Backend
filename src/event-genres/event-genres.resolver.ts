import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventGenresService } from './event-genres.service';
import { EventGenre } from './entities/event-genre.entity';
import { CreateEventGenreInput } from './dto/create-event-genre.input';
import { UpdateEventGenreInput } from './dto/update-event-genre.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Resolver(() => EventGenre)
export class EventGenresResolver {
	constructor(private readonly eventGenresService: EventGenresService) {}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin')
	@Mutation(() => EventGenre)
	createEventGenre(
		@Args('createEventGenreInput')
		createEventGenreInput: CreateEventGenreInput
	) {
		return this.eventGenresService.create(createEventGenreInput);
	}

	@Query(() => [EventGenre], { name: 'eventGenres' })
	findAll() {
		return this.eventGenresService.findAll();
	}

	@Query(() => EventGenre, { name: 'eventGenre' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.eventGenresService.findOne(id);
	}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin')
	@Mutation(() => EventGenre)
	updateEventGenre(
		@Args('updateEventGenreInput')
		updateEventGenreInput: UpdateEventGenreInput
	) {
		return this.eventGenresService.update(updateEventGenreInput);
	}

	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin')
	@Mutation(() => EventGenre)
	removeEventGenre(@Args('id', { type: () => Int }) id: number) {
		return this.eventGenresService.remove(id);
	}
}
