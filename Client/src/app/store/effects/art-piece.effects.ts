import {
  getArtPieceById,
  getArtPieceByIdSuccess,
} from './../actions/art-piece.actions';
import { Response } from 'express';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ArtPieceActions from '../actions/art-piece.actions';
import { switchMap, tap } from 'rxjs';
import { ArtPiecesService } from 'src/app/art-pieces.service';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ArtPieceEffects {
  getAllArtPieces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.getAllArtPieces),
      switchMap(() =>
        this.artPiecesService.getArtPieces().pipe(
          map((artPieces) =>
            ArtPieceActions.getAllArtPiecesSuccess({ artPieces })
          ),
          catchError((error) =>
            of(ArtPieceActions.getAllArtPiecesFailure({ error }))
          )
        )
      )
    )
  );

  getArtPieceById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.getArtPieceById),
      switchMap((action) =>
        this.artPiecesService.getArtPieceById(action.id).pipe(
          map((artPiece) =>
            ArtPieceActions.getArtPieceByIdSuccess({ artPiece })
          ),
          catchError((error) =>
            of(ArtPieceActions.getAllArtPiecesFailure({ error }))
          )
        )
      )
    )
  );

  addArtPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.addArtPiece),
      switchMap((action) =>
        this.artPiecesService.addArtPiece(action.artPiece).pipe(
          map((artPiece) => ArtPieceActions.addArtPieceSuccess({ artPiece })),
          catchError((error) =>
            of(ArtPieceActions.addArtPieceFailure({ error }))
          )
        )
      )
    )
  );

  getArtPiecesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.getArtPiecesForUser),
      switchMap((action) =>
        this.artPiecesService.getArtPiecesForUser(action.id).pipe(
          map((artPieces) =>
            ArtPieceActions.getArtPiecesForUserSuccess({ artPieces })
          ),
          catchError((error) =>
            of(ArtPieceActions.getArtPiecesForUserFailure({ error }))
          )
        )
      )
    )
  );

  deleteArtPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.deleteArtPiece),
      switchMap((action) => {
        const id = action.id;

        return this.artPiecesService.deleteArtPiece(id).pipe(
          map(() =>
            ArtPieceActions.deleteArtPieceSuccess({
              id: id,
            })
          ),
          catchError((error) =>
            of(
              ArtPieceActions.deleteArtPieceFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  updateArtPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtPieceActions.updateArtPiece),
      mergeMap(({ artPiece }) =>
        this.artPiecesService.updateArtPiece(artPiece).pipe(
          map((updatedArtPiece) =>
            ArtPieceActions.updateArtPieceSuccess({ artPiece: updatedArtPiece })
          ),
          catchError((error) =>
            of(ArtPieceActions.updateArtPieceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artPiecesService: ArtPiecesService,
    private router: Router
  ) {}
}
