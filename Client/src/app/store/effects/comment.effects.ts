import { addComment } from './../actions/comment.actions';
import { CommentService } from 'src/app/comment.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as commentActions from '../actions/comment.actions';
import { catchError, map, switchMap } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable()
export class CommentEffects {
  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentActions.getCommentsForArtPiece),
      switchMap((action) =>
        this.CommentService.getCommentsForArtPiece(action.id).pipe(
          map((comments) =>
            commentActions.getCommentsForArtPieceSuccess({ comments })
          ),
          catchError((error) =>
            of(commentActions.getCommentsForArtPieceFailure({ error }))
          )
        )
      )
    )
  );

  addComment$ = createEffect(() =>
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

  deleteComment$ = createEffect(() =>
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
    private CommentService: CommentService,
    private router: Router
  ) {}
}
