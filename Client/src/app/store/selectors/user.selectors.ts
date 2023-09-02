import { adapterAllUsers } from './../reducers/user.reducers';
import {
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  AllUsersState,
  UserProfileState,
  UserState,
} from '../types/user.interface';
import { reducers } from '../reducers/user.reducers';

export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUserForProfieFeature =
  createFeatureSelector<UserProfileState>('profile');

export const selectAllUsersFeature =
  createFeatureSelector<AllUsersState>('allUsers');

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

export const selectUserProfile = createSelector(
  selectUserForProfieFeature,
  (state: UserProfileState) => state.user
);

export const selectUserProfileLoading = createSelector(
  selectUserForProfieFeature,
  (state: UserProfileState) => state.isLoading
);

export const selectUserProfileError = createSelector(
  selectUserForProfieFeature,
  (state: UserProfileState) => state.error
);

export const selectAllUsers = createSelector(
  selectAllUsersFeature,
  adapterAllUsers.getSelectors().selectAll
);

export const selectAllUsersLoading = createSelector(
  selectAllUsersFeature,
  (state: AllUsersState) => state.isLoading
);

export const selectAllUsersError = createSelector(
  selectAllUsersFeature,
  (state: AllUsersState) => state.error
);
