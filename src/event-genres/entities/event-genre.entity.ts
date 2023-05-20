import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generic/entities/generic.entity';

@ObjectType()
@Entity()
export class EventGenre extends GenericEntity {
	@Field(() => String, { description: 'code name' })
	@Column({ unique: true })
	codeName: string;

	@Field(() => String, { description: 'display name' })
	@Column()
	displayName: string;

	@Field(() => String, { description: 'description' })
	@Column()
	description?: string;
}
