import { ArtPiece } from './../types/art-piece';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ArtPieceModel } from '../types/art-piece';
import { ArtPieceState } from '../types/art-piece.interface';
import { createReducer, on } from '@ngrx/store';
import * as artPieceActions from '../actions/art-piece.actions';

export const adapter: EntityAdapter<ArtPieceModel> =
  createEntityAdapter<ArtPieceModel>();

export const initialState: ArtPieceState = adapter.getInitialState({
  artPieces: [],
  isLoading: false,
  error: null,
});

export const artPieceReducers = createReducer(
  initialState,
  on(artPieceActions.getAllArtPieces, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.getAllArtPiecesSuccess, (state, action) => {
    return adapter.addMany(action.artPieces, { ...state, isLoading: false });
  }),
  on(artPieceActions.getAllArtPiecesFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
