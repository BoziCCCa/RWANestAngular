import {
  getChallengesForUser,
  addChallenge,
} from './store/actions/challenge.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengeModel } from './store/types/challenge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  getChallenges(): Observable<ChallengeModel[]> {
    return this.http.get<ChallengeModel[]>(
      'http://localhost:3000/challenge/getAllChallenges',
      {
        withCredentials: true,
      }
    );
  }

  getChallengesForUser(id: number): Observable<ChallengeModel[]> {
    return this.http.get<ChallengeModel[]>(
      `http://localhost:3000/challenge/getChallengesForUser/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  addChallenge(challenge: {
    topic: string;
    userId: number;
  }): Observable<ChallengeModel> {
    return this.http.post<ChallengeModel>(
      `http://localhost:3000/challenge/addChallenge`,
      challenge,
      {
        withCredentials: true,
      }
    );
  }

  deleteChallenge(id: number) {
    return this.http.delete(
      `http://localhost:3000/challenge/deleteChallenge/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
