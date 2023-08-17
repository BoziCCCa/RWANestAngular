import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logInUser),
      tap((action) => console.log('Action dispatched:', action)),
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
          if (!localStorage.getItem('loggedUser')) {
            this.authService.getLoggedUser().subscribe((response) => {
              localStorage.setItem('loggedUser', JSON.stringify(response));
            });
            this.router.navigate(['']);
            console.log('a');
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
            console.log('a');
          }
        })
      ),
    { dispatch: false }
  );

  rehydrateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.rehydrateUser),
      map(() => {
        const userData = localStorage.getItem('loggedUser');

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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
