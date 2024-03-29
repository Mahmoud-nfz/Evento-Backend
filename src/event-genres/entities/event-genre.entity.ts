import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { Event } from '../../events/entities/event.entity';

@ObjectType()
@Entity()
export class EventGenre extends GenericEntity {
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
	@Column({ default: 'event-genre-default.png' })
	image?: string;

	@Field(() => [Event], { description: 'events' })
	@OneToMany(() => Event, (event) => event.genre)
	events?: Event[];
}
