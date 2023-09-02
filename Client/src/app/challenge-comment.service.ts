import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChallengeCommentModel } from './store/types/challenge-comment';

@Injectable({
  providedIn: 'root',
})
export class ChallengeCommentService {
  constructor(private http: HttpClient) {}

  getCommentsForChallenge(id: number): Observable<ChallengeCommentModel[]> {
    return this.http.get<ChallengeCommentModel[]>(
      `http://localhost:3000/challenge-comment/getChallengeCommentsForChallenge/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  addComment(comment: {
    photo: string;
    userId: number;
    challengeId: number;
  }): Observable<ChallengeCommentModel> {
    return this.http.post<ChallengeCommentModel>(
      `http://localhost:3000/challenge-comment/addChallangeComment`,
      comment,
      {
        withCredentials: true,
      }
    );
  }

  deleteComment(id: number) {
    return this.http.delete(
      `http://localhost:3000/comment/deleteChallengeComment/${id}`,
      { withCredentials: true }
    );
  }
}
