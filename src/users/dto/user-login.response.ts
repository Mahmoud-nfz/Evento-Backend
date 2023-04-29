import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.trasnport';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserLoginResponse {
	@Field(() => User)
	user: UserDTO;

	@Field()
	access_token: string;
}
