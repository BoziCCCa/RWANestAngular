import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../types/user.interface';
import { reducers } from '../reducers/user.reducers';

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectIsLoggedIn = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoggedIn
);

export const selectLoading = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoading
);

export const selectLoggedIn = createSelector(
  selectUserFeature,
  (state: UserState) => {
    console.log(state);
    return state.isLoggedIn;
  }
);

export const selectError = createSelector(
  selectUserFeature,
  (state: UserState) => state.error
);
