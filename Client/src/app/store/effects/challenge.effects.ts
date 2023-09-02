import { getChallengesForUser } from './../actions/challenge.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChallengeService } from 'src/app/challenge.service';
import * as ChallengeActions from '../actions/challenge.actions';
import { map, switchMap, of, catchError } from 'rxjs';

@Injectable()
export class ChallengeEffects {
  getAllChallenges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getAllChallenges),
      switchMap(() =>
        this.ChallengeService.getChallenges().pipe(
          map((challenges) =>
            ChallengeActions.getAllChallengesSuccess({ challenges })
          ),
          catchError((error) =>
            of(ChallengeActions.getAllChallengesFailure({ error }))
          )
        )
      )
    )
  );

  getChallengesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.getChallengesForUser),
      switchMap((action) =>
        this.ChallengeService.getChallengesForUser(action.id).pipe(
          map((challenges) =>
            ChallengeActions.getChallengesForUserSuccess({ challenges })
          ),
          catchError((error) =>
            of(ChallengeActions.getChallengesForUserFailure({ error }))
          )
        )
      )
    )
  );

  addChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.addChallenge),
      switchMap((action) =>
        this.ChallengeService.addChallenge(action.challenge).pipe(
          map((challenge) =>
            ChallengeActions.addChallengeSuccess({ challenge })
          ),
          catchError((error) =>
            of(ChallengeActions.addChallengeFailure({ error }))
          )
        )
      )
    )
  );

  deleteChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeActions.deleteChallenge),
      switchMap((action) => {
        const id = action.id;

        return this.ChallengeService.deleteChallenge(id).pipe(
          map(() =>
            ChallengeActions.deleteChallengeSuccess({
              id: id,
            })
          ),
          catchError((error) =>
            of(
              ChallengeActions.deleteChallengeFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ChallengeService: ChallengeService,
    private router: Router
  ) {}
}
