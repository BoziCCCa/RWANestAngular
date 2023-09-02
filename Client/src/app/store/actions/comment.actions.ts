import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../types/comment';

export const getCommentsForArtPiece = createAction(
  '[Comment] Get Comments For Art Piece',
  props<{ id: number }>()
);

export const getCommentsForArtPieceFailure = createAction(
  '[Comment] Get Comments For Art Piece Failure',
  props<{ error: string }>()
);

export const getCommentsForArtPieceSuccess = createAction(
  '[Comment] Get Comments For Art Piece Success ',
  props<{ comments: CommentModel[] }>()
);

export const addComment = createAction(
  '[Comment] Add Comment',
  props<{
    comment: { description: string; userId: number; artPieceId: number };
  }>()
);

export const addCommentSuccess = createAction(
  '[Comment] Add Comment Success',
  props<{ comment: CommentModel }>()
);

export const addCommentFailure = createAction(
  '[Comment] Add Comment Failure',
  props<{ error: string }>()
);

export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ id: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ id: number }>()
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure',
  props<{ error: string }>()
);
