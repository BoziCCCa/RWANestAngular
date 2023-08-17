import { createAction, props } from '@ngrx/store';
import { ArtPieceModel } from '../types/art-piece';

export const getAllArtPieces = createAction(
  '[Art Piece Page] Get All Art Pieces'
);
export const getAllArtPiecesSuccess = createAction(
  '[Art Piece] Get All Art Pieces Success',
  props<{ artPieces: ArtPieceModel[] }>()
);

export const getAllArtPiecesFailure = createAction(
  '[Art Piece] Get All Art Pieces Failure',
  props<{ error: string }>()
);
