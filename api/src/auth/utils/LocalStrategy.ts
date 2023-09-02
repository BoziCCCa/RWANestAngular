import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { userInfo } from 'os';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    console.log(username + ' ' + password);
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    else {
      console.log(user);
      return user;
    }
  }
}
