import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ArtPiecesUserState } from '../store/types/art-piece.interface';
import { getArtPiecesForUser } from '../store/actions/art-piece.actions';
import { Observable } from 'rxjs';
import { ArtPieceModel } from '../store/types/art-piece';
import {
  selectArtPiecesUser,
  selectArtPiecesUserLoading,
} from '../store/selectors/art-piece.selectors';
import { UserProfileState } from '../store/types/user.interface';
import { getUserForProfile } from '../store/actions/user.actions';
import {
  selectLoading,
  selectUserProfile,
  selectUserProfileLoading,
} from '../store/selectors/user.selectors';
import { UserModel } from '../store/types/user';
import { ChallengeModel } from '../store/types/challenge';
import { ChallengesUserState } from '../store/types/challenge.interface';
import { getChallengesForUser } from '../store/actions/challenge.actions';
import {
  selectChallengesUser,
  selectChallengesUserLoading,
} from '../store/selectors/challenge.selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  artPieces$: Observable<ArtPieceModel[]>;
  isLoadingArt$: Observable<boolean>;
  isLoadingProfile$: Observable<boolean>;
  isLoadingChallenges$: Observable<boolean>;
  challenges$: Observable<ChallengeModel[]>;
  isAddArtPieceClicked: boolean = false;
  user$: Observable<UserModel | null>;
  isAddChallengeClicked: boolean = false;
  isPopupOpen = false;
  isArtPiecesClicked: boolean = true;
  isChallengesClicked: boolean = false;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private store: Store<ArtPiecesUserState>,
    private uStore: Store<UserProfileState>,
    private cStore: Store<ChallengesUserState>,
    private router: Router
  ) {
    this.artPieces$ = this.store.select(selectArtPiecesUser);
    this.isLoadingArt$ = this.store.select(selectArtPiecesUserLoading);
    this.isLoadingProfile$ = this.uStore.select(selectUserProfileLoading);
    this.user$ = this.uStore.select(selectUserProfile);
    this.challenges$ = this.cStore.select(selectChallengesUser);
    this.isLoadingChallenges$ = this.cStore.select(selectChallengesUserLoading);
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      const userString = localStorage.getItem('loggedUser');
      if (userString !== null) var user = JSON.parse(userString);
      const userId: number = user.id;
      if (userId == id) this.router.navigate([`/my-profile-page/${id}`]);

      this.store.dispatch(getArtPiecesForUser({ id: id }));
      this.uStore.dispatch(getUserForProfile({ userId: id }));
      this.cStore.dispatch(getChallengesForUser({ id: id }));
      this.artPieces$.subscribe((a) => {
        console.log(a);
      });
    });

    this.isArtPiecesClicked = true;
  }

  addPopup() {
    this.isAddArtPieceClicked = !this.isAddArtPieceClicked;
  }

  ArtPiecesClick() {
    this.isArtPiecesClicked = true;
    this.isChallengesClicked = false;
  }
  ChallengesClick() {
    this.isArtPiecesClicked = false;
    this.isChallengesClicked = true;
  }
}
