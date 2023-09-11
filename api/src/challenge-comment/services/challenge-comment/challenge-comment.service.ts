import { ChallengeService } from 'src/challenge/services/challenge/challenge.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ChallengeCommentDto,
  ChallengeCommentEntity,
} from 'src/challenge-comment/models/challenge-comment.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeCommentService {
  constructor(
    @InjectRepository(ChallengeCommentEntity)
    private CommentRepository: Repository<ChallengeCommentEntity>,
    private UserService: UserService,
    private ChallengeService: ChallengeService,
  ) {}

  async addChallengeComment(challengeCommentDto: ChallengeCommentDto) {
    const comment = new ChallengeCommentEntity();
    comment.id = challengeCommentDto.id;
    comment.photo = challengeCommentDto.photo;

    const user = await this.UserService.getUser(challengeCommentDto.userId);
    const challenge = await this.ChallengeService.getChallengeById(
      challengeCommentDto.challengeId,
    );
    comment.user = user;
    comment.challenge = challenge;

    return this.CommentRepository.save(comment);
  }

  async getChallengeCommentsForChallenge(id: number) {
    return await this.CommentRepository.createQueryBuilder('challengeComment')
      .where('challengeComment.challengeId = :id', { id })
      .leftJoinAndSelect('challengeComment.user', 'user')
      .orderBy('challengeComment.createdAt', 'DESC')
      .getMany();
  }

  async deleteChallengeComment(id: number) {
    return this.CommentRepository.delete(id);
  }
}
