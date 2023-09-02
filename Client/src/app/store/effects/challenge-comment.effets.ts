import { addComment } from './../actions/comment.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as commentActions from '../actions/challenge-comment.actions';
import { catchError, map, switchMap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { ChallengeCommentService } from 'src/app/challenge-comment.service';

@Injectable()
export class ChallengeCommentEffects {
  getChallengeComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentActions.getCommentsForChallenge),
      switchMap((action) =>
        this.CommentService.getCommentsForChallenge(action.id).pipe(
          map((comments) =>
            commentActions.getCommentsForChallengeSuccess({ comments })
          ),
          catchError((error) =>
            of(commentActions.getCommentsForChallengeFailure({ error }))
          )
        )
      )
    )
  );

  addChallengeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentActions.addComment),
      switchMap((action) =>
        this.CommentService.addComment(action.comment).pipe(
          map((comment) => commentActions.addCommentSuccess({ comment })),
          catchError((error) => of(commentActions.addCommentFailure({ error })))
        )
      )
    )
  );

  deleteChallengeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentActions.deleteComment),
      switchMap((action) => {
        const id = action.id;

        return this.CommentService.deleteComment(id).pipe(
          map(() =>
            commentActions.deleteCommentSuccess({
              id: id,
            })
          ),
          catchError((error) =>
            of(
              commentActions.deleteCommentFailure({
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
    private CommentService: ChallengeCommentService
  ) {}
}
