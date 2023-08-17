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
  constructor(
    private actions$: Actions,
    private artPiecesService: ArtPiecesService,
    private router: Router
  ) {}
}
