import { EntityState } from '@ngrx/entity';
import { UserModel } from './user';

export interface UserState extends EntityState<UserModel> {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export interface UserProfileState {
  user: UserModel | null;
  isLoading: boolean;
  error: string | null;
}

export interface AllUsersState extends EntityState<UserModel> {
  isLoading: boolean;
  error: string | null;
}
