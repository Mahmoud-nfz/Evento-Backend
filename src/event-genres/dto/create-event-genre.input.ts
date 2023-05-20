import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventGenreInput {
	@Field(() => String, { description: 'code name' })
	codeName: string;

	@Field(() => String, { description: 'display name' })
	displayName: string;

	@Field(() => String, { description: 'description' })
	description?: string;
}
