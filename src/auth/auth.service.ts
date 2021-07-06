import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../resources/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByLogin(login);
    const isPasswordMatching = await bcrypt.compare(
      pass,
      user?.password as string,
    );
    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: string; login: string }) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
