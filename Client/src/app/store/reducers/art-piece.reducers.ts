import { ArtPiece } from './../types/art-piece';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ArtPieceModel } from '../types/art-piece';
import {
  ArtPieceSingleState,
  ArtPieceState,
  ArtPiecesUserState,
} from '../types/art-piece.interface';
import { createReducer, on } from '@ngrx/store';
import * as artPieceActions from '../actions/art-piece.actions';

export const adapter: EntityAdapter<ArtPieceModel> =
  createEntityAdapter<ArtPieceModel>();

export const adapterSingle: EntityAdapter<ArtPieceModel> =
  createEntityAdapter<ArtPieceModel>();

export const adapterAPUser: EntityAdapter<ArtPieceModel> =
  createEntityAdapter<ArtPieceModel>();

export const initialState: ArtPieceState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const initialStateSingle: ArtPieceSingleState = {
  artPiece: null,
  isLoading: false,
  error: null,
};

export const initialStateAPUser: ArtPiecesUserState =
  adapterAPUser.getInitialState({
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
    return adapter.setAll(action.artPieces, { ...state, isLoading: false });
  }),
  on(artPieceActions.getAllArtPiecesFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(artPieceActions.updateArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.updateArtPieceSuccess, (state, { artPiece }) => {
    return adapter.updateOne(
      { id: artPiece.id, changes: artPiece },
      { ...state, isLoading: false }
    );
  }),
  on(artPieceActions.getArtPiecesForUserFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const singleArtPieceReducer = createReducer(
  initialStateSingle,
  on(artPieceActions.getArtPieceById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.getArtPieceByIdSuccess, (state, action) => ({
    ...state,
    artPiece: action.artPiece,
    isLoading: false,
  })),
  on(artPieceActions.getArtPieceByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(artPieceActions.updateArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.updateArtPieceSuccess, (state, { artPiece }) => {
    return {
      ...state,
      artPiece: { ...state.artPiece, ...artPiece },
      isLoading: false,
    };
  }),
  on(artPieceActions.updateArtPieceFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const artPieceUserReducers = createReducer(
  initialStateAPUser,
  on(artPieceActions.getArtPiecesForUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.getArtPiecesForUserSuccess, (state, action) => {
    return adapterAPUser.setAll(action.artPieces, {
      ...state,
      isLoading: false,
    });
  }),
  on(artPieceActions.getArtPiecesForUserFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(artPieceActions.addArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.addArtPieceSuccess, (state, { artPiece }) => {
    const currentList = Object.values(state.entities);
    const newList = [artPiece, ...currentList].filter(
      (item): item is ArtPieceModel => item !== undefined
    );

    return {
      ...adapterAPUser.setAll(newList, state),
      isLoading: false,
    };
  }),
  on(artPieceActions.addArtPieceFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(artPieceActions.deleteArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.deleteArtPieceSuccess, (state, { id }) => {
    return adapterAPUser.removeOne(id, { ...state, isLoading: false });
  }),
  on(artPieceActions.deleteArtPieceFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(artPieceActions.updateArtPiece, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(artPieceActions.updateArtPieceSuccess, (state, { artPiece }) => {
    return adapterAPUser.updateOne(
      { id: artPiece.id, changes: artPiece },
      { ...state, isLoading: false }
    );
  }),
  on(artPieceActions.getArtPiecesForUserFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
