import {
  ForbiddenException,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new ForbiddenException();
      }
      const userRole = data.role;
      if (userRole === 'user') {
        next();
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
