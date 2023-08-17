import { EntityState } from '@ngrx/entity';
import { UserModel } from './user';



export interface UserState extends EntityState<UserModel> {
  isLoading: boolean;
  isLoggedIn:boolean;
  error: string | null;
}
