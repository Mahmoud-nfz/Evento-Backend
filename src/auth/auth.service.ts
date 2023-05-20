import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from 'src/users/dto/user.trasnport';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async signup(user: CreateUserInput): Promise<UserDTO> {
		let existingUser = await this.usersService.findOne({
			email: user.email,
		});
		if (existingUser) {
			throw new BadRequestException('Email already exists');
		}
		existingUser = await this.usersService.findOne({
			phoneNumber: user.phoneNumber,
		});
		if (existingUser) {
			throw new BadRequestException('Phone number already exists');
		}
		// Generate a salt
		const salt = randomBytes(8).toString('hex');
		// hash the password
		const hash = (await scrypt(user.password, salt, 32)) as Buffer;
		// combine the hash and salt
		const result = salt + '.' + hash.toString('hex');

		user = { ...user, password: result };
		return this.usersService.create(user);
	}

	async validateUser(email: string, password: string): Promise<UserDTO> {
		const user = await this.usersService.findOneWithPassword({ email });
		if (!user) throw new NotFoundException('user not found');

		const [salt, storedHash] = user.password.split('.');

		const hash = (await scrypt(password, salt, 32)) as Buffer;

		if (storedHash !== hash.toString('hex'))
			throw new UnauthorizedException('Invalid password');
		return user;
	}

	async login(user: any) {
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
