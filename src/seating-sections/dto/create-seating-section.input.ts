import { InputType, Int, Field } from '@nestjs/graphql';
import { Event } from '../../events/entities/event.entity';

@InputType()
export class CreateSeatingSectionInput {
	@Field(() => String, { description: 'name' })
	name: string;

	@Field(() => String, { description: 'description' })
	description: string;

	@Field(() => Int, { description: 'price' })
	price: number;

	@Field(() => Int, { description: 'number of seats' })
	numberOfSeats: number;

	@Field(() => Int, { description: 'event id' })
	event: Event;
}
