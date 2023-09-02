import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ArtPieceState,
  ArtPiecesUserState,
} from '../store/types/art-piece.interface';
import { Store } from '@ngrx/store';
import { addArtPiece } from '../store/actions/art-piece.actions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-art-piece',
  templateUrl: './add-art-piece.component.html',
  styleUrls: ['./add-art-piece.component.css'],
})
export class AddArtPieceComponent implements OnInit {
  isPopupOpen = false;
  myForm: FormGroup;

  constructor(
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private store: Store<ArtPiecesUserState>,
    private fireStorage: AngularFireStorage
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  openPopup() {
    this.isPopupOpen = true;
    this.popupService.openPopup();
  }

  closePopup() {
    this.isPopupOpen = false;
    this.popupService.closePopup();
  }

  submitForm() {
    if (this.myForm.valid) {
      const info = this.myForm.value;
      const userString = localStorage.getItem('loggedUser');
      if (userString !== null) var user = JSON.parse(userString);
      const userIdd: number = user.id;
      console.log('id', userIdd);

      const filePath = `darwings/${Date.now()}_${info.photo.name}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, info.photo);
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            console.log('aaa', {
              name: info.name,
              description: info.description,
              photo: downloadURL,
              userId: userIdd,
            });
            this.closePopup();

            this.store.dispatch(
              addArtPiece({
                artPiece: {
                  name: info.name,
                  description: info.description,
                  photo: downloadURL,
                  userId: userIdd,
                },
              })
            );
          })
        )
        .subscribe();
    }
  }

  handleFileChange(event: any) {
    this.myForm.value.photo = event.target.files[0];
    if (this.myForm.value.photo) {
      console.log(this.myForm.value);
    }
  }
  ngOnInit(): void {}
}
