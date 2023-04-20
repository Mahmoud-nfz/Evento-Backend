import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}
	create(createUserInput: CreateUserInput) {
		console.log(createUserInput);
		return this.usersRepository.save(createUserInput);
	}

	findAll() {
		return this.usersRepository.find();
	}

	findOne(id: number) {
		return this.usersRepository.findOne({ where: { id } });
	}

	async update(id: number, updateUserInput: UpdateUserInput) {
		return this.usersRepository.save({ id, ...updateUserInput });
	}

	remove(id: number) {
		return this.usersRepository.softDelete({ id });
	}
}
