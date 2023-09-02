import { createAction, props } from '@ngrx/store';
import { ChallengeCommentModel } from '../types/challenge-comment';

export const getCommentsForChallenge = createAction(
  '[Challenge Comment] Get Comments For Challenge',
  props<{ id: number }>()
);

export const getCommentsForChallengeFailure = createAction(
  '[Challenge Comment] Get Comments For Challenge Failure',
  props<{ error: string }>()
);

export const getCommentsForChallengeSuccess = createAction(
  '[Challenge Comment] Get Comments For Challenge Success ',
  props<{ comments: ChallengeCommentModel[] }>()
);

export const addComment = createAction(
  '[Challenge Comment] Add Comment',
  props<{
    comment: { photo: string; userId: number; challengeId: number };
  }>()
);

export const addCommentSuccess = createAction(
  '[Challenge Comment] Add Comment Success',
  props<{ comment: ChallengeCommentModel }>()
);

export const addCommentFailure = createAction(
  '[Challenge Comment] Add Comment Failure',
  props<{ error: string }>()
);

export const deleteComment = createAction(
  '[Challenge Comment] Delete Comment',
  props<{ id: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Challenge Comment] Delete Comment Success',
  props<{ id: number }>()
);

export const deleteCommentFailure = createAction(
  '[Challenge Comment] Delete Comment Failure',
  props<{ error: string }>()
);
