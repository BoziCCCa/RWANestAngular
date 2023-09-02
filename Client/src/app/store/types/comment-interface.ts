import { EntityState } from '@ngrx/entity';
import { CommentModel } from './comment';

export interface CommentState extends EntityState<CommentModel> {
  isLoading: boolean;
  error: string | null;
}
