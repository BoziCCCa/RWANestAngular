import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CommentModel } from './store/types/comment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  getCommentsForArtPiece(id: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/comment/getCommentsForArtPiece/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  addComment(comment: {
    description: string;
    userId: number;
    artPieceId: number;
  }): Observable<CommentModel> {
    return this.http.post<CommentModel>(
      `http://localhost:3000/comment/addComment`,
      comment,
      {
        withCredentials: true,
      }
    );
  }

  deleteComment(id: number) {
    return this.http.delete(
      `http://localhost:3000/comment/deleteComment/${id}`,
      { withCredentials: true }
    );
  }
}
