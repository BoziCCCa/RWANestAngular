import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../types/comment-interface';
import { adapter } from '../reducers/challenge-comment.reducers';
import { ChallengeCommentState } from '../types/challenge-comment.interface';

export const selectChallengeCommentFeature =
  createFeatureSelector<ChallengeCommentState>('challengeComment');

export const selectChallengeComments = createSelector(
  selectChallengeCommentFeature,
  adapter.getSelectors().selectAll
);

export const selectChallengeCommentsLoading = createSelector(
  selectChallengeCommentFeature,
  (state: ChallengeCommentState) => state.isLoading
);

export const selectChallengeCommentsError = createSelector(
  selectChallengeCommentFeature,
  (state: ChallengeCommentState) => state.error
);
