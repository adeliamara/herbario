import { Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);

    if (!user) {
      throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return await this.generateTokens(user);
    }

    throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
  }

  async generateTokens(payload: User) {
    const accessToken = this.jwtService.sign(
      { email: payload.email, id: payload.id, roles: payload.roles },
      {
        secret: process.env.SECRET_KEY,
        expiresIn: '3000s',
      },
    );

    const refreshToken = this.jwtService.sign(
      {email: payload.email, id: payload.id, roles: payload.roles  },
      {
        secret: process.env.SECRET_KEY_REFRESH,
        expiresIn: '7d',
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async reauthenticate(refreshToken: string): Promise<any> {
    const payload: User = await this.verifyRefreshToken(refreshToken);
    return this.generateTokens(payload);
  }

  private async verifyRefreshToken(refreshToken: string): Promise<User> {
    if (!refreshToken) {
      throw new NotFoundException('Refresh token não fornecido');
    }

    try {
      const { email } = this.jwtService.decode(refreshToken) as { email: string };
      const user: User = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      this.jwtService.verify(refreshToken, {
        secret: process.env.SECRET_KEY_REFRESH,
      });

      return user;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err; 
      }

      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      }

      throw new HttpException('Erro ao verificar o Refresh Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
