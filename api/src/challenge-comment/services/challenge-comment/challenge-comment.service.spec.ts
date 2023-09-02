import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeCommentService } from './challenge-comment.service';

describe('ChallengeCommentService', () => {
  let service: ChallengeCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeCommentService],
    }).compile();

    service = module.get<ChallengeCommentService>(ChallengeCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
