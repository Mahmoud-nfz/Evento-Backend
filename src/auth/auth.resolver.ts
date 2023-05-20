import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './curr-user.decorator';
import { AuthService } from './auth.service';
import { UserLoginResponse } from 'src/users/dto/user-login.response';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserDTO } from 'src/users/dto/user.trasnport';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private usersService: UsersService
	) {}

	@Mutation(() => User)
	async signup(@Args('user') user: CreateUserInput): Promise<UserDTO> {
		console.log(user);
		const registeredUser = await this.authService.signup(user);
		return registeredUser;
	}

	@Mutation(() => UserLoginResponse)
	async login(
		@Args('email') email: string,
		@Args('password') password: string
	): Promise<UserLoginResponse> {
		const user = await this.authService.validateUser(email, password);
		const accessToken = await this.authService.login(user);
		return { ...accessToken, user };
	}

	@Query((returns) => User)
	@UseGuards(GqlAuthGuard)
	whoAmI(@CurrentUser() user: User) {
		if (!user) {
			return new NotFoundException();
		}
		return this.usersService.findOne({ id: user.id });
	}

	@Query((returns) => String)
	@UseGuards(GqlAuthGuard, RolesGuard)
	@Roles('admin')
	hello(@CurrentUser() user: User) {
		return `hello ${user.email}`;
	}
}
