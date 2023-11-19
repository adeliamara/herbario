
import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email, pass) {
    console.log(email)
    const user = await this.usersService.findOne(email);
    console.log(user)
    if (user?.password !== pass) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      ;
    }

    const payload = { sub: user.id, username: user.email, roles: user.roles};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}