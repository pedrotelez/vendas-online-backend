import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    // variable createUser will store the data sent by the user in the body of the request
    return this.userService.createUser(createUser)
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

}
