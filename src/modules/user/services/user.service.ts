import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(userDetails: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  get(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id, userDetails: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save({ ...user, ...userDetails });
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  // Todo: implement cascade delete for user
  // async deleteUserCascade(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }

  getUserContacts(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: { contacts: true },
    });
  }

  getUserTransactions(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
      relations: { transactions: true },
    });
  }
}
