import { EntityState } from '@ngrx/entity';
import { ChallengeModel } from './challenge';

export interface ChallengeState extends EntityState<ChallengeModel> {
  isLoading: boolean;
  error: string | null;
}

export interface ChallengesUserState extends EntityState<ChallengeModel> {
  isLoading: boolean;
  error: string | null;
}
