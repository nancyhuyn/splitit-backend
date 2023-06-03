import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dtos/CreateUser.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(
    @Body('user_details') userDetails: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(userDetails);
  }

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Put(':uuid')
  async updateUserbyId(
    @Body() userDetails: UpdateUserDto,
    @Param('uuid', ParseUUIDPipe) id: string,
  ) {
    await this.userService.updateUser(id, userDetails);
  }

  @Put(':uuid')
  async updateUserbyUuid(
    @Body() userDetails: UpdateUserDto,
    @Param('uuid', ParseUUIDPipe) id: string,
  ) {
    await this.userService.updateUser(id, userDetails);
  }

  @Delete(':uuid')
  async deleteUserByUuid(@Param('uuid', ParseUUIDPipe) id: string) {
    await this.userService.deleteUser(id);
  }
}
