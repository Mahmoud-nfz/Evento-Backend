import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { EventGenre } from '../../event-genres/entities/event-genre.entity';
import { SeatingSection } from 'src/seating-sections/entities/seating-section.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Entity()
export class Event extends GenericEntity {
	@Field(() => String, { description: 'code name' })
	@Column({ unique: true })
	codeName: string;

	@Field(() => String, { description: 'display name' })
	@Column()
	displayName: string;

	@Field(() => String, { description: 'color' })
	@Column()
	color: string;

	@Field(() => String, { description: 'description' })
	@Column()
	description?: string;

	@Field(() => String, { description: 'image' })
	@Column({ default: 'event-default.png' })
	image?: string;

	@Field(() => User, { description: 'event owner' })
	@ManyToOne(() => User, (user) => user.events)
	owner: User;

	@Field(() => EventGenre, { description: 'event genre' })
	@ManyToOne(() => EventGenre, (eventGenre) => eventGenre.events)
	genre?: EventGenre;

	@Field(() => [SeatingSection], { description: 'seating sections' })
	@OneToMany(() => SeatingSection, (seatingSection) => seatingSection.event)
	seatingSections?: SeatingSection[];
}
