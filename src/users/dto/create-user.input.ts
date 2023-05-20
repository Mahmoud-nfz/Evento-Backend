import { InputType, Int, Field } from '@nestjs/graphql';
import {
	IsNotEmpty,
	IsEmail,
	MaxLength,
	IsString,
	IsNumber,
	IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserInput {
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

	@Field(() => String, { description: 'phone number' })
	@IsNotEmpty()
	// @IsNumber()
	// @MaxLength(8)
	phoneNumber: string;

	@Field(() => String, { description: 'password' })
	@IsNotEmpty()
	@MaxLength(40)
	password: string;

	@Field(() => String, { description: 'town' })
	@IsNotEmpty()
	town: string;

	@Field(() => String, { description: 'state' })
	@IsNotEmpty()
	state: string;
}
