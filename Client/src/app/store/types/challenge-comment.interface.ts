import { EntityState } from '@ngrx/entity';
import { CommentModel } from './comment';
import { ChallengeCommentModel } from './challenge-comment';

export interface ChallengeCommentState
  extends EntityState<ChallengeCommentModel> {
  isLoading: boolean;
  error: string | null;
}
