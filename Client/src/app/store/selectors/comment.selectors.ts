import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../types/comment-interface';
import { adapter } from '../reducers/comment.reducers';
export const selectCommentState =
  createFeatureSelector<CommentState>('comment');

export const selectComments = createSelector(
  selectCommentState,
  adapter.getSelectors().selectAll
);

export const selectCommentsLoading = createSelector(
  selectCommentState,
  (state: CommentState) => state.isLoading
);

export const selectCommentsError = createSelector(
  selectCommentState,
  (state: CommentState) => state.error
);
