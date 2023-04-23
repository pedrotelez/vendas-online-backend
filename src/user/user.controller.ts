import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto) : Promise<User> {
    // variable createUser will store the data sent by the user in the body of the request
    return this.userService.createUser(createUser)
  }

  @Get()
  async getAllUsers() : Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
