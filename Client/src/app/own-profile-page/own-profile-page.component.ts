import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtPieceModel } from '../store/types/art-piece';
import { UserModel } from '../store/types/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ArtPiecesUserState } from '../store/types/art-piece.interface';
import { UserProfileState } from '../store/types/user.interface';
import {
  selectArtPiecesUser,
  selectArtPiecesUserLoading,
} from '../store/selectors/art-piece.selectors';
import {
  selectLoading,
  selectUserProfile,
  selectUserProfileLoading,
} from '../store/selectors/user.selectors';
import { getArtPiecesForUser } from '../store/actions/art-piece.actions';
import { getUserForProfile } from '../store/actions/user.actions';
import { PopupService } from '../popup.service';
import { ChallengeModel } from '../store/types/challenge';
import { ChallengesUserState } from '../store/types/challenge.interface';
import {
  selectChallengesUser,
  selectChallengesUserLoading,
} from '../store/selectors/challenge.selectors';
import {
  addChallenge,
  deleteChallenge,
  getChallengesForUser,
} from '../store/actions/challenge.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-own-profile-page',
  templateUrl: './own-profile-page.component.html',
  styleUrls: ['./own-profile-page.component.css'],
})
export class OwnProfilePageComponent implements OnInit {
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
  public addChallengeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private store: Store<ArtPiecesUserState>,
    private uStore: Store<UserProfileState>,
    private cStore: Store<ChallengesUserState>,
    private router: Router,
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.artPieces$ = this.store.select(selectArtPiecesUser);
    this.isLoadingArt$ = this.store.select(selectArtPiecesUserLoading);
    this.isLoadingProfile$ = this.uStore.select(selectUserProfileLoading);
    this.user$ = this.uStore.select(selectUserProfile);
    this.challenges$ = this.cStore.select(selectChallengesUser);
    this.isLoadingChallenges$ = this.cStore.select(selectChallengesUserLoading);
    this.addChallengeForm = this.formBuilder.group({
      topic: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      var user = this.authService.getWithExpiry('loggedUser');
      if (user) {
        const userId: number = user.id;
        if (userId != id) this.router.navigate([`/profile-page/${id}`]);

        this.store.dispatch(getArtPiecesForUser({ id: id }));
        this.uStore.dispatch(getUserForProfile({ userId: id }));
        this.cStore.dispatch(getChallengesForUser({ id: id }));
      }
    });

    this.popupService.popupState$.subscribe((isOpen) => {
      this.isPopupOpen = isOpen;
    });
    this.isArtPiecesClicked = true;
  }

  addPopup() {
    this.isAddArtPieceClicked = !this.isAddArtPieceClicked;
  }

  submitAddChallengeClick() {
    if (this.addChallengeForm.valid) {
      this.cStore.dispatch(
        addChallenge({
          challenge: {
            topic: this.addChallengeForm.value.topic,
            userId: this.id,
          },
        })
      );
    }
  }

  ArtPiecesClick() {
    this.isArtPiecesClicked = true;
    this.isChallengesClicked = false;
  }
  ChallengesClick() {
    this.isArtPiecesClicked = false;
    this.isChallengesClicked = true;
  }

  OpenAddChallengeForm() {
    this.isAddChallengeClicked = !this.isAddChallengeClicked;
  }
  deleteChallengee(id: number) {
    this.cStore.dispatch(deleteChallenge({ id: id }));
  }
}
