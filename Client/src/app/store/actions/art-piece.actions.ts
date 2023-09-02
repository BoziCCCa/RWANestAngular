import { createAction, props } from '@ngrx/store';
import { ArtPieceModel } from '../types/art-piece';
import { CommentModel } from '../types/comment';

export const getAllArtPieces = createAction('[Art Piece] Get All Art Pieces');
export const getAllArtPiecesSuccess = createAction(
  '[Art Piece] Get All Art Pieces Success',
  props<{ artPieces: ArtPieceModel[] }>()
);

export const getAllArtPiecesFailure = createAction(
  '[Art Piece] Get All Art Pieces Failure',
  props<{ error: string }>()
);

export const getArtPieceById = createAction(
  '[Art Piece] Get Art Piece By ID ',
  props<{ id: number }>()
);

export const getArtPieceByIdFailure = createAction(
  '[Art Piece] Get Art Piece By ID Failure',
  props<{ error: string }>()
);

export const getArtPieceByIdSuccess = createAction(
  '[Art Piece] Get Art Piece By ID Success ',
  props<{ artPiece: ArtPieceModel }>()
);

export const getArtPiecesForUser = createAction(
  '[Art Piece] Get Art Pieces For User ',
  props<{ id: number }>()
);

export const getArtPiecesForUserFailure = createAction(
  '[Art Piece] Get Art Piece For User Failure',
  props<{ error: string }>()
);

export const getArtPiecesForUserSuccess = createAction(
  '[Art Piece] Get Art Piece For User Success ',
  props<{ artPieces: ArtPieceModel[] }>()
);

export const addArtPiece = createAction(
  '[Art Piece] Add Art Piece ',
  props<{
    artPiece: {
      name: string;
      description: string;
      photo: string;
      userId: number;
    };
  }>()
);

export const addArtPieceFailure = createAction(
  '[Art Piece] Add Art Piece Failure',
  props<{ error: string }>()
);

export const addArtPieceSuccess = createAction(
  '[Art Piece] Add Art Piece Success ',
  props<{ artPiece: ArtPieceModel }>()
);

export const deleteArtPiece = createAction(
  '[Art Piece] Delete Art Piece',
  props<{ id: number }>()
);

export const deleteArtPieceSuccess = createAction(
  '[Art Piece] Delete Art Piece Success',
  props<{ id: number }>()
);

export const deleteArtPieceFailure = createAction(
  '[Art Piece] Delete Art Piece Failure',
  props<{ error: string }>()
);

export const updateArtPiece = createAction(
  '[Art Piece] Update Art Piece',
  props<{
    artPiece: {
      id: number;
      name: string;
      description: string;
      photo: string;
    };
  }>()
);

export const updateArtPieceSuccess = createAction(
  '[Art Piece] Update Art Piece Success',
  props<{ artPiece: ArtPieceModel }>()
);

export const updateArtPieceFailure = createAction(
  '[Art Piece] Update Art Piece Failure',
  props<{ error: any }>()
);
