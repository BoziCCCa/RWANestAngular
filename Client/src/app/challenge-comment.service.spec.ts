import { TestBed } from '@angular/core/testing';

import { ChallengeCommentService } from './challenge-comment.service';

describe('ChallengeCommentService', () => {
  let service: ChallengeCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
