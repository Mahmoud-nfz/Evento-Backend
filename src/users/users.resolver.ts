import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	PartialType,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.create(createUserInput);
	}

	@Query(() => [User], { name: 'users' })
	findAll() {
		return this.usersService.findAll();
	}

	@Query(() => User, { name: 'user' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.findOne({ id });
	}

	@Mutation(() => User)
	async updateUser(
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	) {
		const user = await this.usersService.update(
			updateUserInput.id,
			updateUserInput
		);
		return user;
	}

	@Mutation(() => User)
	removeUser(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.remove(id);
	}
}
