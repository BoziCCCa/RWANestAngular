import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengeModel } from '../store/types/challenge';
import { ChallengeService } from '../challenge.service';
import { ChallengeState } from '../store/types/challenge.interface';
import { Store } from '@ngrx/store';
import { AllUsersState } from '../store/types/user.interface';
import { getAllChallenges } from '../store/actions/challenge.actions';
import { getAllUsers } from '../store/actions/user.actions';
import {
  selectAllChallenges,
  selectAllChallengesLoading,
} from '../store/selectors/challenge.selectors';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  challenges$: Observable<ChallengeModel[]>;
  constructor(
    private store: Store<ChallengeState>,
    private uStore: Store<AllUsersState>
  ) {
    this.isLoading$ = this.store.select(selectAllChallengesLoading);
    this.challenges$ = this.store.select(selectAllChallenges);
  }

  getChallenges() {
    this.store.dispatch(getAllChallenges());
  }

  getAllUsers() {
    this.uStore.dispatch(getAllUsers());
  }

  ngOnInit(): void {
    this.getChallenges();
    this.getAllUsers();
  }
}
