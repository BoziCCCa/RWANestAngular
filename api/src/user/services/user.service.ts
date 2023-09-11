import { LoginDto } from './../models/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async addUser(user: UserEntity) {
    const userr = await this.UserRepository.findOneBy({
      username: user.username,
    });
    if (userr == null) {
      user.password = await bcrypt.hash(user.password, 10);
      return await this.UserRepository.save(user);
    } else return 'Vec postoji korisnik sa tim korisnickim imenom';
  }

  deleteUser(id: number) {
    return this.UserRepository.delete(id);
  }

  async getUser(id: number) {
    return await this.UserRepository.findOneBy({ id: id });
  }

  async getUsers() {
    return await this.UserRepository.find();
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.UserRepository.findOne({
      where: { username: loginDto.username },
    });

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }

  async updateUser(user: UserEntity) {
    const userr = await this.UserRepository.findOneBy({
      id: user.id,
    });
    userr.firstName = user.firstName;
    userr.lastName = user.lastName;
    userr.username = user.username;
    userr.dateOfBirth = user.dateOfBirth;
    userr.email = user.email;
    if (user.photo !== '') {
      userr.photo = user.photo;
    }
    await this.UserRepository.update(user.id, userr);

    return userr;
  }

  async getUserByUsername(username: string) {
    return await this.UserRepository.findOneBy({ username: username });
  }

  async getLoggedUser(data: any) {
    const user = await this.UserRepository.findOneBy({
      username: data.username,
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  async findAllUsersBySearch(searchInput: string) {
    const users = await this.UserRepository.find();

    const searchLowerCase = searchInput.toLowerCase();
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchLowerCase),
    );
  }
}
