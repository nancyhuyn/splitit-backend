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

  createUser(userDetails: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // Todo: add return type
  async updateUser(userDetails: UpdateUserDto) {
    const id = userDetails.id;
    // Find user that this contact will belong to
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.save({ ...user, ...userDetails });
  }

  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  // Todo: implement cascade delete for user
  // async deleteUserCascade(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }

  getUserContacts(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
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
