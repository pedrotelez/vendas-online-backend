import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { loginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService
            .findUserByEmail(loginDto.email)
            .catch(() => undefined);

        // console.log(`LoginDto From request: ${JSON.stringify(loginDto)}`);
        // console.log(`User From database: ${JSON.stringify(user)}`);

        const isMatch = await compare(loginDto.password, user?.password)

        if (!user || !isMatch) {
            throw new NotFoundException('Invalid E-mail or password');
        }

        const payload = new loginPayload(user);

        return {
            accessToken: this.jwtService.sign({ ...payload }),
            user: new ReturnUserDto(user),
        }
    }
}
