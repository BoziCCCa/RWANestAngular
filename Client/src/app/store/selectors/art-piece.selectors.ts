import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ArtPieceSingleState,
  ArtPieceState,
  ArtPiecesUserState,
} from '../types/art-piece.interface';
import * as fromArtPiece from '../reducers/art-piece.reducers';
import {
  adapter,
  adapterSingle,
  adapterAPUser,
} from '../reducers/art-piece.reducers';

export const selectArtPieceState =
  createFeatureSelector<ArtPieceState>('artPiece');

export const selectArtPiecesUserState =
  createFeatureSelector<ArtPiecesUserState>('artPiecesUser');

export const selectArtPieces = createSelector(
  selectArtPieceState,
  adapter.getSelectors().selectAll
);

export const selectArtPieceLoading = createSelector(
  selectArtPieceState,
  (state: ArtPieceState) => state.isLoading
);

export const selectArtPieceError = createSelector(
  selectArtPieceState,
  (state: ArtPieceState) => state.error
);

export const selectArtPieceStateSingle =
  createFeatureSelector<ArtPieceSingleState>('artPieceSingle');

export const selectSingleArtPiece = createSelector(
  selectArtPieceStateSingle,
  (state: ArtPieceSingleState) => state.artPiece
);

export const selectSingleArtPieceLoading = createSelector(
  selectArtPieceStateSingle,
  (state: ArtPieceSingleState) => state.isLoading
);

export const selectSingleArtPieceError = createSelector(
  selectArtPieceStateSingle,
  (state: ArtPieceSingleState) => state.error
);

export const selectArtPiecesUser = createSelector(
  selectArtPiecesUserState,
  adapterAPUser.getSelectors().selectAll
);

export const selectArtPiecesUserLoading = createSelector(
  selectArtPiecesUserState,
  (state: ArtPiecesUserState) => state.isLoading
);

export const selectArtPiecesUserError = createSelector(
  selectArtPiecesUserState,
  (state: ArtPiecesUserState) => state.error
);
