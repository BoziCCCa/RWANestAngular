import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ArtPieceModel } from './store/types/art-piece';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtPiecesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  getArtPieces(): Observable<ArtPieceModel[]> {
    return this.http.get<ArtPieceModel[]>(
      'http://localhost:3000/art-piece/getAllArtPieces',
      {
        withCredentials: true,
      }
    );
  }
}
