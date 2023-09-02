import { EntityState } from '@ngrx/entity';
import { ArtPieceModel } from './art-piece';

export interface ArtPieceState extends EntityState<ArtPieceModel> {
  isLoading: boolean;
  error: string | null;
}

export interface ArtPieceSingleState {
  artPiece: ArtPieceModel | null;
  isLoading: boolean;
  error: string | null;
}

export interface ArtPiecesUserState extends EntityState<ArtPieceModel> {
  isLoading: boolean;
  error: string | null;
}