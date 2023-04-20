import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MaxLength, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field(() => String, { description: 'username' })
	@IsNotEmpty()
	@MaxLength(30)
	username: string;

	@Field(() => String, { description: 'first name' })
	@IsNotEmpty()
	@MaxLength(30)
	firstName: string;

	@Field(() => String, { description: 'last name' })
	@MaxLength(30)
	@IsNotEmpty()
	lastName: string;

	@Field(() => String, { description: 'email' })
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(40)
	email: string;

	@Field(() => String, { description: 'password' })
	@IsNotEmpty()
	@MaxLength(40)
	password: string;
}
