import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtPiecesService } from '../art-pieces.service';
import { ArtPieceModel } from '../store/types/art-piece';
import {
  ArtPieceState,
  ArtPieceSingleState,
} from '../store/types/art-piece.interface';
import { Store } from '@ngrx/store';
import {
  deleteArtPiece,
  getArtPieceById,
  updateArtPiece,
} from '../store/actions/art-piece.actions';
import { Observable, finalize } from 'rxjs';
import {
  selectArtPieceLoading,
  selectSingleArtPieceLoading,
  selectArtPieceStateSingle,
  selectArtPieces,
  selectSingleArtPiece,
} from '../store/selectors/art-piece.selectors';
import { CommentState } from '../store/types/comment-interface';
import {
  addComment,
  getCommentsForArtPiece,
  deleteComment,
} from '../store/actions/comment.actions';
import {
  selectComments,
  selectCommentsLoading,
} from '../store/selectors/comment.selectors';
import { CommentModel } from '../store/types/comment';
import { calculateTimeAgo } from '../store/types/comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-single-art-piece',
  templateUrl: './single-art-piece.component.html',
  styleUrls: ['./single-art-piece.component.css'],
})
export class SingleArtPieceComponent implements OnInit {
  artPiece$: Observable<ArtPieceModel | null>;
  isLoading$: Observable<boolean>;
  isLoadingComments$: Observable<boolean>;
  comments$: Observable<CommentModel[]>;
  myForm: FormGroup;
  public updateForm: FormGroup;
  id!: number;
  user: any;
  userId: any;
  public isEditClicked: boolean;
  constructor(
    private route: ActivatedRoute,
    private store: Store<ArtPieceSingleState>,
    private cStore: Store<CommentState>,
    private formBuilder: FormBuilder,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) {
    this.artPiece$ = this.store.select(selectSingleArtPiece);
    this.isLoading$ = this.store.select(selectSingleArtPieceLoading);
    this.isLoadingComments$ = this.cStore.select(selectCommentsLoading);
    this.comments$ = this.cStore.select(selectComments);
    this.isEditClicked = false;
    this.myForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photo: [''],
    });

    this.route.params.subscribe((params) => {
      const userString = localStorage.getItem('loggedUser');
      if (userString !== null) this.user = JSON.parse(userString);
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.store.dispatch(getArtPieceById({ id: id }));
      this.cStore.dispatch(getCommentsForArtPiece({ id: id }));

      this.artPiece$.subscribe((artPiece) => {
        if (artPiece) {
          console.log('haha', artPiece.user.id);
          this.userId = artPiece.user.id;
          this.updateForm.patchValue({
            name: artPiece.name,
            description: artPiece.description,
          });
        }
      });
      this.comments$.subscribe((a) => {});
    });
  }

  deleteComment(id: number) {
    const isConfirmed = window.confirm(
      'Da li ste sigurni da zelite da obrisete vas komentar?'
    );

    if (isConfirmed) {
      this.cStore.dispatch(deleteComment({ id: id }));
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData: string = this.myForm.value.description;
      console.log('a', formData);

      this.cStore.dispatch(
        addComment({
          comment: {
            description: formData,
            userId: this.user.id,
            artPieceId: this.id,
          },
        })
      );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
  onDeleteClick() {
    const isConfirmed = window.confirm(
      'Da li ste sigurni da zelite da obrisete vase umetnicko delo?'
    );

    if (isConfirmed) {
      this.store.dispatch(deleteArtPiece({ id: this.id }));
      this.router.navigate([`/profile-page/${this.user.id}`]);
    }
  }

  onEditClick() {
    this.isEditClicked = !this.isEditClicked;
  }

  onEditSubmitClick() {
    if (this.updateForm.valid) {
      if (this.updateForm.value.photo != '') {
        const filePath = `darwings/${Date.now()}_${
          this.updateForm.value.photo.name
        }`;
        const fileRef = this.fireStorage.ref(filePath);
        const task = this.fireStorage.upload(
          filePath,
          this.updateForm.value.photo
        );
        task
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              const downloadURL = await fileRef.getDownloadURL().toPromise();
              console.log('aaa', {
                id: this.id,
                name: this.updateForm.value.name,
                description: this.updateForm.value.description,
                photo: downloadURL,
              });
              console.log(downloadURL);
              this.store.dispatch(
                updateArtPiece({
                  artPiece: {
                    id: this.id,
                    name: this.updateForm.value.name,
                    description: this.updateForm.value.description,
                    photo: downloadURL,
                  },
                })
              );
            })
          )
          .subscribe();
      } else {
        this.store.dispatch(
          updateArtPiece({
            artPiece: {
              id: this.id,
              name: this.updateForm.value.name,
              description: this.updateForm.value.description,
              photo: '',
            },
          })
        );
      }
      this.isEditClicked = false;
    }
  }
}
