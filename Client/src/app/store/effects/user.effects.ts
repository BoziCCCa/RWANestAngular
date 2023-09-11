import { getUserForProfile } from './../actions/user.actions';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { EMPTY, Observable, filter, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserModel } from '../types/user';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logInUser),
      switchMap((action) =>
        this.authService.login(action.user).pipe(
          map((response) =>
            UserActions.logInUserSuccess({ message: response })
          ),
          catchError((error) =>
            of(UserActions.logInUserFailure({ error: error.message }))
          ) // Dispatch failure action
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logInUserSuccess),
        tap(() => {
          if (!this.authService.getWithExpiry('loggedUser')) {
            this.authService.getLoggedUser().subscribe((response) => {
              localStorage.setItem(
                'loggedUser',
                JSON.stringify({
                  value: response,
                  expDate: new Date().getTime() + 3600 * 1000,
                })
              );
            });
            this.router.navigate(['']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => UserActions.logoutSuccess()),
          catchError((error) => of(UserActions.logoutFailure({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => {
          if (localStorage.getItem('loggedUser')) {
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
          }
        })
      ),
    { dispatch: false }
  );

  rehydrateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.rehydrateUser),
      map(() => {
        const userData = this.authService.getWithExpiry('loggedUser');

        if (userData) {
          const user = JSON.parse(userData);
          return UserActions.logInUserSuccess({ message: user });
        } else {
          return UserActions.logout();
        }
      }),
      catchError((error) => of(UserActions.rehydrateUserFailure({ error })))
    )
  );

  getUserForProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserForProfile),
      switchMap((action) =>
        this.authService.getUserById(action.userId).pipe(
          map((user) => UserActions.getUserForProfileSuccess({ user })),
          catchError((error) =>
            of(UserActions.getUserForProfileFailure({ error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map((updatedUser) =>
            UserActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  getAllUsersBySearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getAllUsersBySearch),
      switchMap((action) => {
        const search = action.search;

        if (!search || search.trim() === '') {
          return of(UserActions.getAllUsersBySearchSuccess({ users: [] }));
        }

        return this.authService.getAllUSersBySearch(search).pipe(
          map((users) => UserActions.getAllUsersBySearchSuccess({ users })),
          catchError((error) =>
            of(UserActions.getAllUsersBySearchFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
