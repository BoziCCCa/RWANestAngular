import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Put,
  Res,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service';
import { LoginDto, UserEntity } from '../models/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('addUser')
  create(@Body() user: UserEntity) {
    return this.userService.addUser(user);
  }

  @Delete('deleteUser/:id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('getUser/:id')
  @UseGuards(UserGuard)
  get(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDTO: LoginDto,
  ) {
    const token = await this.userService.signIn(loginDTO);
    response.cookie('jwt', token, { httpOnly: true });
    const user = await this.userService.getUserByUsername(loginDTO.username);
    const { password, ...result } = user;
    return result;
  }

  @Post('logout')
  @UseGuards(UserGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'logged out' };
  }

  @Get('getUsers')
  @UseGuards(UserGuard)
  getAll() {
    return this.userService.getUsers();
  }
  @Put('updateUser')
  @UseGuards(UserGuard)
  update(@Body() user: UserEntity) {
    return this.userService.updateUser(user);
  }

  @Get('getLoggedUser')
  @UseGuards(UserGuard)
  async getLoggedUser(@Req() request: any) {
    let cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    console.log('data', data);
    const userbaza = await this.userService.getLoggedUser(data);
    return userbaza;
  }
}
