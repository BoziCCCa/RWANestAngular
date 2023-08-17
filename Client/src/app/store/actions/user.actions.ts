import { UserModel } from './../types/user';
import { createAction, props } from '@ngrx/store';

export const logInUser = createAction(
  '[User Page] LogIn User',
  props<{ user: { username: string; password: string } }>()
);

export const logInUserSuccess = createAction(
  '[User  Page] LogIn User Success',
  props<{ message: string }>()
);

export const logInUserFailure = createAction(
  '[User Page] LogIn User Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User Page] Logout');
export const logoutSuccess = createAction('[User Page] Logout Success');
export const logoutFailure = createAction(
  '[User Page] Logout Failure',
  props<{ error: string }>()
);

export const rehydrateUser = createAction(
  '[User Page] Rehydrate',
  props<{ message: string }>()
);

export const rehydrateUserFailure = createAction(
  '[User Page] Rehydrate Failure',
  props<{ error: string }>()
);
