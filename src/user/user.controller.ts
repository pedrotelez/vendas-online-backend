import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    // variable createUser will store the data sent by the user in the body of the request
    return this.userService.createUser(createUser)
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @Get('/:userId')
  async GetUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }

}
