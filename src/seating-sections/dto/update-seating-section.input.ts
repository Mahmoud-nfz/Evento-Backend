import { CreateSeatingSectionInput } from './create-seating-section.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSeatingSectionInput extends PartialType(
	CreateSeatingSectionInput
) {
	@Field(() => Int)
	id: number;
}
