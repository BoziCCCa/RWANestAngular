import { addCommentSuccess } from './../actions/comment.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CommentModel } from '../types/comment';
import { CommentState } from '../types/comment-interface';
import { createReducer, on } from '@ngrx/store';
import * as commentActions from '../actions/comment.actions';

export const adapter: EntityAdapter<CommentModel> =
  createEntityAdapter<CommentModel>();

export const initialState: CommentState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const commentReducers = createReducer(
  initialState,
  on(commentActions.getCommentsForArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(commentActions.getCommentsForArtPieceSuccess, (state, action) => {
    return adapter.setAll(action.comments, { ...state, isLoading: false });
  }),
  on(commentActions.getCommentsForArtPieceFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(commentActions.addComment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(commentActions.addCommentSuccess, (state, action) => {
    return adapter.addOne(action.comment, { ...state, isLoading: false });
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
