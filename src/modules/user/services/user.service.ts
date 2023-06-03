import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(userDetails: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      ...userDetails,
    });
    return this.userRepository.save(newUser);
  }

  getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  updateUser(id: string, userDetails: CreateUserDto) {
    return this.userRepository.update(
      { id },
      {
        ...userDetails,
      },
    );
  }

  deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
