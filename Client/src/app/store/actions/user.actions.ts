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
  '[User] Logout Failure',
  props<{ error: string }>()
);

export const rehydrateUser = createAction(
  '[User] Rehydrate',
  props<{ message: string }>()
);

export const rehydrateUserFailure = createAction(
  '[User] Rehydrate Failure',
  props<{ error: string }>()
);

export const getUserForProfile = createAction(
  '[User Profile] Get User For Profile',
  props<{ userId: number }>()
);

export const getUserForProfileFailure = createAction(
  '[User Profile] Get User For Profile Failure',
  props<{ error: string }>()
);

export const getUserForProfileSuccess = createAction(
  '[User Profile] Get User For Profile Success',
  props<{ user: UserModel }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      photo: string;
      dateOfBirth: Date;
    };
  }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: UserModel }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

export const getAllUsers = createAction('[User] Get All Users');

export const getAllUsersSuccess = createAction(
  '[User] Get All Users Success',
  props<{ users: UserModel[] }>()
);

export const getAllUsersFailure = createAction(
  '[User] Get All Users Failure',
  props<{ error: string }>()
);
