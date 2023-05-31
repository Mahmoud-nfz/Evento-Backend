import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { LowercaseTransformer } from '../../generic/transformers/lowercase.transformer';
import { Event } from '../../events/entities/event.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@ObjectType()
@Entity()
export class User extends GenericEntity {
	@Field(() => String, { description: 'first name' })
	@Column()
	firstName: string;

	@Field(() => String, { description: 'last name' })
	@Column()
	lastName: string;

	@Field(() => String, { description: 'email' })
	@Column({ unique: true })
	email: string;

	@Field(() => String, { description: 'phone number' })
	@Column({ unique: true })
	phoneNumber: string;

	@Field(() => String, { description: 'password' })
	@Column({ select: false })
	password: string;

	@Field(() => String, { description: 'role' })
	@Column()
	role: string;

	@Field(() => String, { description: 'town' })
	@Column()
	town: string;

	@Field(() => String, { description: 'state' })
	@Column()
	state: string;

	@Field(() => [Event], { description: 'events' })
	@OneToMany(() => Event, (event) => event.owner)
	events?: Event[];

	@Field(() => [Seat], {
		description: 'seats reserved awaiting purchase confirmation',
	})
	@OneToMany(() => Seat, (seat) => seat.userReserved)
	seatsReserved?: Seat[];

	@Field(() => [Seat], { description: 'seats purchased' })
	@OneToMany(() => Seat, (seat) => seat.userPurchased)
	seatsPurchased?: Seat[];
}
