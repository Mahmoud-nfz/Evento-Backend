import { CreateEventGenreInput } from './create-event-genre.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventGenreInput extends PartialType(CreateEventGenreInput) {
	@Field(() => Int)
	id: number;
}
