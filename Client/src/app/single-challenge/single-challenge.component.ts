import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { ChallengeCommentModel } from '../store/types/challenge-comment';
import { Store } from '@ngrx/store';
import { ChallengeCommentState } from '../store/types/challenge-comment.interface';
import {
  selectChallengeComments,
  selectChallengeCommentsLoading,
} from '../store/selectors/challenge-comment.selectors';
import {
  addComment,
  getCommentsForChallenge,
} from '../store/actions/challenge-comment.actions';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-single-challenge',
  templateUrl: './single-challenge.component.html',
  styleUrls: ['./single-challenge.component.css'],
})
export class SingleChallengeComponent implements OnInit {
  public addForm: FormGroup;
  public isAddClicked: boolean;
  isLoadingComments$: Observable<boolean>;
  comments$: Observable<ChallengeCommentModel[]>;
  user: any;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cStore: Store<ChallengeCommentState>,
    private fireStorage: AngularFireStorage
  ) {
    this.isAddClicked = false;
    this.addForm = this.formBuilder.group({
      photo: ['', Validators.required],
    });

    this.isLoadingComments$ = this.cStore.select(
      selectChallengeCommentsLoading
    );
    this.comments$ = this.cStore.select(selectChallengeComments);

    this.route.params.subscribe((params) => {
      const userString = localStorage.getItem('loggedUser');
      if (userString !== null) this.user = JSON.parse(userString);
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.cStore.dispatch(getCommentsForChallenge({ id: this.id }));
  }

  onAddClick() {
    this.isAddClicked = !this.isAddClicked;
  }

  onAddSubmitClick() {
    if (this.addForm.valid) {
      const info = this.addForm.value;
      const filePath = `darwings/${Date.now()}_${info.photo.name}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, info.photo);
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const downloadURL = await fileRef.getDownloadURL().toPromise();

            this.cStore.dispatch(
              addComment({
                comment: {
                  photo: downloadURL,
                  userId: this.user.id,
                  challengeId: this.id,
                },
              })
            );
          })
        )
        .subscribe();
    }
  }
}
