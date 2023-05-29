import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { EventGenre } from '../../event-genres/entities/event-genre.entity';

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

	@Field(() => EventGenre, { description: 'event genre' })
	@ManyToOne(() => EventGenre, (eventGenre) => eventGenre.events)
	genre?: EventGenre;
}
