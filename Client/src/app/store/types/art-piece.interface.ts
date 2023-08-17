import { EntityState } from '@ngrx/entity';
import { ArtPieceModel } from './art-piece';

export interface ArtPieceState extends EntityState<ArtPieceModel> {
  isLoading: boolean;
  error: string | null;
}
