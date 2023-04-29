import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserDTO extends OmitType(User, ['password']) {}
