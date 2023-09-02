import { UserService } from 'src/user/services/user.service';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly UserService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.UserService.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }
}
