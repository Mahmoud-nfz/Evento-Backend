import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}
	create(createUserInput: CreateUserInput): Promise<User> {
		console.log(createUserInput);
		return this.usersRepository.save(createUserInput);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(user: Partial<User>): Promise<User> {
		return this.usersRepository.findOne({ where: user });
	}

	async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
		return this.usersRepository.save({ id, ...updateUserInput });
	}

	remove(id: number): Promise<UpdateResult> {
		return this.usersRepository.softDelete({ id });
	}
}
