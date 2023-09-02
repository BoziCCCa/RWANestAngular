import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeCommentController } from './challenge-comment.controller';

describe('ChallengeCommentController', () => {
  let controller: ChallengeCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeCommentController],
    }).compile();

    controller = module.get<ChallengeCommentController>(ChallengeCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
