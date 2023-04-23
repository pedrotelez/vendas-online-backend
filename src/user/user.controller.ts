import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Post()
  async createUser(
    @Body() createUser: CreateUserDto, // variable createUser will store the data sent by the user in the body of the request
  ) {
    return {
      ...createUser,
      password: undefined, // the password will not be returned to the user
    };
  }
}
