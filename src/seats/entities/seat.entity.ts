import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { Event } from '../../events/entities/event.entity';
import { SeatingSection } from 'src/seating-sections/entities/seating-section.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity()
export class Seat extends GenericEntity {
	@Field(() => String, { description: 'name' })
	@Column()
	name: string;

	@Field(() => Int, { description: 'price' })
	@Column()
	price: number;

	@Field(() => Boolean, { description: 'is selling' })
	@Column()
	isSelling: boolean;

	@Field(() => Event, { description: 'seating section' })
	@ManyToOne(() => SeatingSection, (seatingSection) => seatingSection.seats)
	seatingSection: SeatingSection;

	@Field(() => User, {
		description: 'user that reserved, awaiting purchase confirmation',
	})
	@ManyToOne(() => User, (user) => user.seatsReserved)
	userReserved?: User;

	@Field(() => User, { description: 'user that purchased' })
	@ManyToOne(() => User, (user) => user.seatsPurchased)
	userPurchased?: User;
}
