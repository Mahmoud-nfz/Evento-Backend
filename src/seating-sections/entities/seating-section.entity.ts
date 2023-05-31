import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { Event } from '../../events/entities/event.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@ObjectType()
@Entity()
export class SeatingSection extends GenericEntity {
	@Field(() => String, { description: 'name' })
	@Column()
	name: string;

	@Field(() => String, { description: 'description' })
	@Column()
	description: string;

	@Field(() => Int, { description: 'price' })
	@Column()
	price: number;

	@Field(() => Int, { description: 'number of seats' })
	@Column()
	numberOfSeats: number;

	@Field(() => Boolean, { description: 'is currently selling' })
	@Column({ default: false })
	isSelling: boolean;

	@Field(() => Event, { description: 'event' })
	@ManyToOne(() => Event, (event) => event.seatingSections)
	event: Event;

	@Field(() => [Seat], { description: 'seats' })
	@OneToMany(() => Seat, (seat) => seat.seatingSection)
	seats: Seat[];
}
