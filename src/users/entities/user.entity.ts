import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenericEntity } from '../../generic/entities/generic.entity';
import { Column, Entity } from 'typeorm';
import { LowercaseTransformer } from '../../generic/transformers/lowercase.transformer';

@ObjectType()
@Entity()
export class User extends GenericEntity {
	@Field(() => String, { description: 'username' })
	@Column({ unique: true, transformer: new LowercaseTransformer() })
	username: string;

	@Field(() => String, { description: 'first name' })
	@Column()
	firstName: string;

	@Field(() => String, { description: 'last name' })
	@Column()
	lastName: string;

	@Field(() => String, { description: 'email' })
	@Column({ unique: true })
	email: string;

	@Field(() => String, { description: 'password' })
	@Column({ select: false })
	password: string;
}
