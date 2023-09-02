import { updateArtPiece } from './store/actions/art-piece.actions';
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

  getArtPieceById(id: number): Observable<ArtPieceModel> {
    return this.http.get<ArtPieceModel>(
      `http://localhost:3000/art-piece/getArtPieceById/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  getArtPiecesForUser(id: number): Observable<ArtPieceModel[]> {
    return this.http.get<ArtPieceModel[]>(
      `http://localhost:3000/art-piece/getArtPiecesForUser/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  addArtPiece(artPiece: {
    name: string;
    description: string;
    photo: string;
    userId: number;
  }): Observable<ArtPieceModel> {
    return this.http.post<ArtPieceModel>(
      `http://localhost:3000/art-piece/addArtPiece`,
      artPiece,
      {
        withCredentials: true,
      }
    );
  }

  deleteArtPiece(id: number) {
    return this.http.delete(
      `http://localhost:3000/art-piece/deleteArtPiece/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  updateArtPiece(artPiece: {
    id: number;
    name: string;
    description: string;
    photo: string;
  }): Observable<ArtPieceModel> {
    return this.http.put<ArtPieceModel>(
      `http://localhost:3000/art-piece/updateArtPiece`,
      artPiece,
      {
        withCredentials: true,
      }
    );
  }
}
