import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    if (!cookie) {
      return false;
    }
    try {
      const decodedToken = await this.jwtService.verifyAsync(cookie);
      const user = await this.userService.getUserByUsername(
        decodedToken['username'],
      );
      return user.role === 'user';
    } catch (error) {
      return false;
    }
  }
}
