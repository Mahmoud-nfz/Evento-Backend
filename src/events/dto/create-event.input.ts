import { InputType, Int, Field } from '@nestjs/graphql';
import { EventGenre } from '../../event-genres/entities/event-genre.entity';
import { Column, ManyToOne } from 'typeorm';

@InputType()
export class CreateEventInput {
	@Field(() => String, { description: 'code name' })
	codeName: string;

	@Field(() => String, { description: 'display name' })
	displayName: string;

	@Field(() => String, { description: 'description' })
	description?: string;

	@Field(() => String, { description: 'color' })
	color: string;

	@Field(() => String, { description: 'image' })
	image?: string;

	@Field(() => Int, { description: 'event genre id' })
	genre?: EventGenre;
}
