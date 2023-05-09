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

	@Field(() => String, { description: 'address' })
	@Column()
	address: string;

	@Field(() => String, { description: 'gps address' })
	@Column({ nullable: true })
	gpsAddress: string;
}
