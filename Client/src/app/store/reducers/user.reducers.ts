import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserModel } from '../types/user';
import {
  AllUsersState,
  UserProfileState,
  UserState,
} from '../types/user.interface';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export const adapter: EntityAdapter<UserModel> =
  createEntityAdapter<UserModel>();

export const adapterAllUsers: EntityAdapter<UserModel> =
  createEntityAdapter<UserModel>();

export const initialState: UserState = adapter.getInitialState({
  isLoading: false,
  isLoggedIn: false,
  error: null,
});

export const initialStateAllUsers: AllUsersState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const initialProfileState: UserProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(userActions.logInUser, (state) => ({ ...state, isLoading: true })),
  on(userActions.logInUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(userActions.logInUserFailure, (state) => ({
    ...state,
    isLoading: false,
    error: 'Neuspesno logovanje',
  })),
  on(userActions.logoutSuccess, (state) => ({
    ...state,
    isLoggedIn: false,
  }))
);

export const profileReducers = createReducer(
  initialProfileState,
  on(userActions.getUserForProfile, (state) => ({ ...state, isLoading: true })),
  on(userActions.getUserForProfileSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoading: false,
  })),
  on(userActions.getUserForProfileFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(userActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.updateUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: { ...state.user, ...user },
      isLoading: false,
    };
  }),
  on(userActions.updateUserFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const allUsersReducer = createReducer(
  initialStateAllUsers,
  on(userActions.getAllUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.getAllUsersSuccess, (state, action) => {
    return adapter.setAll(action.users, { ...state, isLoading: false });
  }),
  on(userActions.getAllUsersFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
