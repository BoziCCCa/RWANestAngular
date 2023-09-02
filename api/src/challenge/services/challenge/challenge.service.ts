import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ChallengeDto,
  ChallengeEntity,
  ChallengeUpdateDto,
} from 'src/challenge/models/challenge.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(ChallengeEntity)
    private ChallengeRepository: Repository<ChallengeEntity>,
    private userService: UserService,
  ) {}

  async addChallenge(challengeDto: ChallengeDto) {
    const challenge = new ChallengeEntity();
    challenge.topic = challengeDto.topic;

    const user = await this.userService.getUser(challengeDto.userId);
    console.log(user);
    challenge.user = user;

    return await this.ChallengeRepository.save(challenge);
  }
  async deleteChallenge(id: number) {
    return await this.ChallengeRepository.delete(id);
  }
  async updateChallenge(challengeUpdateDto: ChallengeUpdateDto) {
    const challenge = await this.ChallengeRepository.findOneBy({
      id: challengeUpdateDto.id,
    });

    challenge.topic = challengeUpdateDto.topic;

    await this.ChallengeRepository.update(challengeUpdateDto.id, challenge);
    return challenge;
  }

  async getAllChallenges() {
    return await this.ChallengeRepository.createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.user', 'user')
      .select([
        'challenge.id',
        'challenge.topic',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.username',
        'user.photo',
      ])
      .orderBy('challenge.createdAt', 'DESC')
      .getMany();
  }

  async getChallengesForUser(id: number) {
    return await this.ChallengeRepository.find({
      where: {
        user: { id: id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getChallengeById(id: number) {
    return this.ChallengeRepository.createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.user', 'user')
      .where('challenge.id = :id', { id })
      .getOne();
  }
}
