import { addCommentSuccess } from './../actions/comment.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CommentModel } from '../types/comment';
import { CommentState } from '../types/comment-interface';
import { createReducer, on } from '@ngrx/store';
import * as commentActions from '../actions/challenge-comment.actions';
import { ChallengeCommentModel } from '../types/challenge-comment';
import { ChallengeCommentState } from '../types/challenge-comment.interface';

export const adapter: EntityAdapter<ChallengeCommentModel> =
  createEntityAdapter<ChallengeCommentModel>();

export const initialState: ChallengeCommentState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const challengeCommentReducers = createReducer(
  initialState,
  on(commentActions.getCommentsForChallenge, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(commentActions.getCommentsForChallengeSuccess, (state, action) => {
    return adapter.setAll(action.comments, { ...state, isLoading: false });
  }),
  on(commentActions.getCommentsForChallengeFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(commentActions.addComment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(commentActions.addCommentSuccess, (state, action) => {
    const currentList = Object.values(state.entities);
    const newList = [action.comment, ...currentList].filter(
      (item): item is ChallengeCommentModel => item !== undefined
    );

    return {
      ...adapter.setAll(newList, state),
      isLoading: false,
    };
  }),
  on(commentActions.addCommentFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(commentActions.deleteComment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(commentActions.deleteCommentSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, isLoading: false });
  }),
  on(commentActions.deleteCommentFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
