import { InputType, Int, Field } from '@nestjs/graphql';
import { SeatingSection } from 'src/seating-sections/entities/seating-section.entity';

@InputType()
export class CreateSeatInput {
	@Field(() => String, { description: 'name' })
	name: string;

	@Field(() => Int, { description: 'price' })
	price: number;

	@Field(() => Int, { description: 'seating section' })
	seatingSection: SeatingSection;

	@Field(() => Boolean, { description: 'is selling' })
	isSelling: boolean;
}
