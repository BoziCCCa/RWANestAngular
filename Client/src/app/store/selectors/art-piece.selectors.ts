import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtPieceState } from '../types/art-piece.interface';
import * as fromArtPiece from '../reducers/art-piece.reducers';
import { adapter } from '../reducers/art-piece.reducers';

export const selectArtPieceState =
  createFeatureSelector<ArtPieceState>('artPiece');

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
