import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ChallengeState,
  ChallengesUserState,
} from '../types/challenge.interface';
import { adapter, adapterChallengeUser } from '../reducers/challenge.reducers';

export const selectAllChallengesFeature =
  createFeatureSelector<ChallengeState>('challenges');

export const selectChallengesUserFeature =
  createFeatureSelector<ChallengesUserState>('challengesUser');

export const selectAllChallenges = createSelector(
  selectAllChallengesFeature,
  adapter.getSelectors().selectAll
);

export const selectAllChallengesLoading = createSelector(
  selectAllChallengesFeature,
  (state: ChallengeState) => state.isLoading
);

export const selectAllChallengesError = createSelector(
  selectAllChallengesFeature,
  (state: ChallengeState) => state.error
);

export const selectChallengesUser = createSelector(
  selectChallengesUserFeature,
  adapterChallengeUser.getSelectors().selectAll
);

export const selectChallengesUserLoading = createSelector(
  selectChallengesUserFeature,
  (state: ChallengesUserState) => state.isLoading
);

export const selectChallengesUserError = createSelector(
  selectChallengesUserFeature,
  (state: ChallengesUserState) => state.error
);
