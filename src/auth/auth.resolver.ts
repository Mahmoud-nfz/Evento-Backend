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

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private usersService: UsersService
	) {}

	@Mutation(() => UserLoginResponse)
	async login(
		@Args('username') username: string,
		@Args('password') password: string
	): Promise<UserLoginResponse> {
		const user = await this.authService.validateUser(username, password);
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
		return `hello ${user.username}`;
	}
}
