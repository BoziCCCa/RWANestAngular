import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserModel } from '../types/user';
import { UserState } from '../types/user.interface';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export const adapter: EntityAdapter<UserModel> =
  createEntityAdapter<UserModel>();

export const initialState: UserState = adapter.getInitialState({
  isLoading: false,
  isLoggedIn: false,
  error: null,
});

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
