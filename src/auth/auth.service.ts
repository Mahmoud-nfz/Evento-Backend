import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/user.trasnport';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<UserDTO> {
		const user = await this.usersService.findOne({ username, password });
		if (user) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		console.log(user);
		const payload = {
			username: user.username,
			sub: user.id,
			role: user.role,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
