import { CreateSeatInput } from './create-seat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSeatInput extends PartialType(CreateSeatInput) {
	@Field(() => Int)
	id: number;
}
